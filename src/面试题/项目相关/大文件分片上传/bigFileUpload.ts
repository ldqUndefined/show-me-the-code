import {
  FileApi,
  EUploadStatus,
  IUploadFileChunkPayload
} from 'app/requests/file-api';
import { CancelToken, isCancel } from 'app/requests';
interface IBigFileUpload {
  file: File;
  md5: string;
  fileSuffix: string;
  onProgress?: (current: number, total: number) => void;
  onFinish?: (fileUrl: string) => void;
  onError?: (e: EStepError) => void;
}
const DEFAULT_CHUNKSIZE = 1024 * 1024 * 5; //5MB
const CONCURRENT_COUNT = 4; //请求并发数量,不要到6，否则由于xhr请求的高优先级会阻塞js等文件的下载(路由跳转白屏)。
const FITHT_FOR_NEXT_UPLOAD_CHANCE = 'FITHT_FOR_NEXT_UPLOAD_CHANCE';
const CHUNK_MAX_ERROR_COUNT = 3;
const triggerFight = () => {
  const event = new Event(FITHT_FOR_NEXT_UPLOAD_CHANCE);
  window.dispatchEvent(event);
};
const MANUAL_STOP = 'MANUAL_STOP'; //手动停止错误标识符
export enum EStepError {
  CHECK_ERROR = 'CHECK_ERROR', //查看错误
  UPLOAD_ERROR = 'UPLOAD_ERROR', //上传错误
  MERGE_ERROR = 'MERGE_ERROR' //合并错误
}
export class BigFileUploadClass {
  static MAX_CONCURRENT_COUNT: number = CONCURRENT_COUNT; //所有大文件上传任务总共能并发的数量，为了防止多个实例的并发数量超过6，所以限制所有实例的并发数量。
  static TOTAL_LOADING_COUNT: number = 0; //所有大文件上传任务的正在上传数
  private file: File; //整个文件
  private md5: string; //文件md5
  private fileSuffix: string; //文件后缀
  private chunkSize: number = DEFAULT_CHUNKSIZE; //一个文件块大小
  private totalChunk: number; //总共多少块
  private toUploadChunkList: number[] = []; //要上传的块的id
  private uploadingCount: number = 0; //当前任务实例正在上传的块数
  private cancelToken = CancelToken.source(); //用于取消文件文件上传的token
  private errorChunkIdMap = new Map<number, number>(); //记录分片上传出错的chunkId对应的次数
  private onProgress?: (current: number, total: number) => void; //过程回调
  private onFinish?: (fileUrl: string) => void; //成功回调
  private onError?: (e: EStepError) => void;
  /**
   * 构造函数
   * @param param0 实例初始化参数
   */
  constructor({
    file,
    md5,
    fileSuffix,
    onProgress,
    onFinish,
    onError
  }: IBigFileUpload) {
    this.file = file;
    this.md5 = md5;
    this.fileSuffix = fileSuffix;
    this.totalChunk = Math.ceil(file.size / this.chunkSize);
    //初始化默认所有分片都需要上传
    this.toUploadChunkList = Array.from(
      { length: this.totalChunk },
      (_, i) => i
    );
    this.onProgress = onProgress;
    this.onFinish = onFinish;
    this.onError = onError;
  }

  /**
   * 开始，或从暂停中恢复，都重新查上传结果
   */
  start() {
    return this.checkSignature();
  }
  /**
   * 停止，当前实例所有分片上传停止,且停止争夺下次分片上传机会，内外都可调用
   */
  stop() {
    this.cancelToken.cancel(MANUAL_STOP);
    //重新赋值一个新的cancelToken，用旧的会直接取消
    this.cancelToken = CancelToken.source();
  }
  /**
   * 注册争夺下一次分片上传的机会
   */
  private registerFightChance() {
    window.addEventListener(FITHT_FOR_NEXT_UPLOAD_CHANCE, this.uploadManage);
  }
  /**
   * 注销争夺下一次分片上传的机会
   *
   * 由于不断地绑定和解绑，事件触发时要触发的函数的队列的顺序也会一直变化，就会出现“轮询实例”的效果
   */
  private cancelFightChance() {
    window.removeEventListener(FITHT_FOR_NEXT_UPLOAD_CHANCE, this.uploadManage);
  }
  /**
   * 查看分片上传状况的函数
   *
   * 当是未上传或曾经上传过状态时，开始任务
   *
   * 当是已经上传过的状态时，触发“秒传”
   */
  private async checkSignature() {
    try {
      const { data } = await FileApi.checkSignature({
        md5: this.md5,
        shardSize: this.chunkSize
      });
      console.log(data);
      switch (data.status) {
        case EUploadStatus.NOT:
          return this.uploadManage();
        case EUploadStatus.EVER:
          // 曾经上传过的话，过滤掉已上传的chunkId，只剩下待上传chunkId
          const { fileIndex } = data;
          const uploadedChunkSet = new Set(fileIndex.map(item => Number(item)));
          this.toUploadChunkList = this.toUploadChunkList.filter(
            item => !uploadedChunkSet.has(item)
          );
          return this.uploadManage();
        case EUploadStatus.UPLOADED:
          const { fileName } = data;
          this.onProgress && this.onProgress(this.totalChunk, this.totalChunk);
          this.onFinish && this.onFinish(fileName);
          break;
        default:
          console.log('后台返回了未商榷的status');
      }
    } catch (e) {
      this.onError && this.onError(EStepError.CHECK_ERROR);
      console.log(e);
    }
  }
  /**
   * 增加当前实例及所有实例正在上传分片数
   */
  private increaseUploadingCount() {
    this.uploadingCount++;
    BigFileUploadClass.TOTAL_LOADING_COUNT++;
  }
  /**
   * 减少当前实例及所有实例正在上传分片数
   *
   * 退出下一次争抢分片的机会
   *
   * 触发争抢下一次分片上传机会的事件(让别的实例抢)
   */
  private decreaseUploadingCount() {
    this.uploadingCount--;
    BigFileUploadClass.TOTAL_LOADING_COUNT--;
    this.cancelFightChance();
    triggerFight();
  }
  /**
   * 是否可以合并文件
   */
  private canMerge() {
    return this.uploadingCount === 0 && this.toUploadChunkList.length === 0;
  }
  /**
   * 可以上传分片要满足的条件
   *
   * 1.当前所有实例分片上传并发数小于最大值
   *
   * 2.还有要上传的分片
   */
  private canUploadNextChunk() {
    return (
      BigFileUploadClass.TOTAL_LOADING_COUNT <
        BigFileUploadClass.MAX_CONCURRENT_COUNT &&
      this.toUploadChunkList.length > 0
    );
  }
  /**
   * 手动暂停时，把暂停上传的chunkId吐回到待上传数组中。
   * 虽然可能已经上传完了，但在前端眼里是还没上传的。
   * unshift是为了尽可能地按顺序上传分片(即使乱序并没啥影响)
   * @param chunkId
   */
  private returnChunkIdToList(chunkId: number) {
    this.toUploadChunkList.unshift(chunkId);
  }
  /**
   * 实例运行核心函数，判断当前是继续上传还是合并分片，会持续被调用
   *
   * 这个函数设计成箭头函数是有原因的，绑定this，因为要保持绑定和解绑时引用相同
   */
  private uploadManage = () => {
    if (this.canMerge()) {
      return this.mergeChunk();
    }
    while (this.canUploadNextChunk()) {
      this.increaseUploadingCount();
      this.uploadFileChunk(this.toUploadChunkList.shift()!);
    }
    //第一次或重新加入争夺分片的上传机会
    this.registerFightChance();
  };
  /**
   * 分片上传函数。成功上传后调用this.uploadManage判断是继续上传还是合并分片
   *
   * 当上传失败时分情况处理
   * @param chunkId
   */
  private async uploadFileChunk(chunkId: number) {
    try {
      const payload = this.generateSlicePayload(chunkId);
      await FileApi.uploadFileChunk(payload, {
        cancelToken: this.cancelToken.token
      });
      this.decreaseUploadingCount();
      this.onProgress &&
        this.onProgress(
          this.totalChunk - this.toUploadChunkList.length - this.uploadingCount,
          this.totalChunk
        );
      //继续任务
      this.uploadManage();
    } catch (e) {
      if (isCancel(e)) {
        //手动暂停或者因某分片多次上传失败，不重传
        console.log(
          `手动暂停或因某分片多次上传失败导致文件${this.file.name}下标为${chunkId}的块取消上传`
        );
        this.decreaseUploadingCount();
        this.returnChunkIdToList(chunkId);
      } else {
        //两种情况：
        //1.接口报错，重传
        //2.请求超时，也就是axios里的timeout，也重传(注意虽然超时了和手动取消了在浏览器里都是canceled，但isCancel只判断手动取消的情况，超时情况下isCancel判断为false)
        const errorCount = this.errorChunkIdMap.get(chunkId) || 0;
        if (errorCount < CHUNK_MAX_ERROR_COUNT) {
          // 单个分片5次重传机会
          this.errorChunkIdMap.set(chunkId, errorCount + 1);
          this.uploadFileChunk(chunkId);
        } else {
          // 单个分片重传5次失败后，取消所有上传，清除this.errorChunkIdMap(可能会重新开始)
          this.stop();
          this.errorChunkIdMap.clear();
          this.onError && this.onError(EStepError.UPLOAD_ERROR);
        }
      }
    }
  }
  /**
   * 分片合并函数
   */
  private async mergeChunk() {
    // 合并过程有没有可能在等待合并结果的过程中因为别的实例上传完一个分片而触发到this.uploadManage而又触发一次mergeChunk呢？
    // 不可能，因为在自己的最后一个分片上传完后取消了事件监听，并且在this.uploadManage判断是否可以合并分片
    // 后跳到这个函数，此时并没有监听事件
    try {
      const { data } = await FileApi.mergeFileChunk({
        md5: this.md5,
        shardTotal: this.totalChunk,
        shardSize: this.chunkSize,
        fileSuffix: this.fileSuffix
      });
      this.onFinish && this.onFinish(data);
    } catch (e) {
      this.onError && this.onError(EStepError.MERGE_ERROR);
      console.log(e);
    }
  }
  /**
   * 分片上传的参数构造函数
   * @param chunkId
   */
  private generateSlicePayload(chunkId: number) {
    const start = chunkId * this.chunkSize;
    //end要注意别超出大小了
    const end =
      start + this.chunkSize > this.file.size
        ? this.file.size
        : start + this.chunkSize;
    const payloadByChunkId: IUploadFileChunkPayload = {
      file: this.file.slice(start, end),
      md5: this.md5,
      shardIndex: chunkId,
      shardSize: this.chunkSize,
      shardTotal: this.totalChunk,
      fileSuffix: this.fileSuffix
    };
    console.log(payloadByChunkId, BigFileUploadClass.TOTAL_LOADING_COUNT);
    return payloadByChunkId;
  }
}

//当有文件在上传时弹窗提示
window.addEventListener('beforeunload', e => {
  if (BigFileUploadClass.TOTAL_LOADING_COUNT !== 0) {
    e.returnValue = '有文件在上传噢';
    return '有文件在上传噢';
  }
});
