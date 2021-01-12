//JS实现一个带并发限制的异步调度器Scheduler,
//保证同时运行的任务最多有两个。
//完善代码中Scheduler类,使得以下程序能正确输出：
//Scheduler内部可以写其他的方法
// class Scheduler {
//   add(promiseCreator) { ... }

//   // ...
// }

// const timeout = (time) => new Promise(resolve => {
//   setTimeout(resolve, time)
// })

// const scheduler = new Scheduler()
// const addTask = (time, order) => {
//   scheduler.add(() => timeout(time))
//     .then(() => console.log(order))
// }

// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')
// output: 2 3 1 4

// 一开始,1、2两个任务进入队列
// 500ms时,2完成,输出2,任务3进队
// 800ms时,3完成,输出3,任务4进队
// 1000ms时,1完成,输出1
// 1200ms时,4完成,输出4

class Scheduler {
  constructor() {
    this.list = [];
    this.runningTask = 0;
  }
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      this.list.push({
        status: 'no',
        promiseCreator,
        resolve
      });
      this.schedule();
    });
  }
  schedule() {
    while (
      this.runningTask < 2 &&
      this.list.some(item => item.status === 'no')
    ) {
      let next = this.list.find(item => item.status === 'no');
      next.status = 'yes';
      this.runningTask++;
      next.promiseCreator().then(() => {
        this.runningTask--;
        next.resolve();
        this.schedule();
      });
    }
  }
}
const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output: 2 3 1 4

//优化版
class Scheduler {
  constructor() {
    this.toRun = [];
    this.running = [];
  }
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      this.toRun.push({ promiseCreator, resolve });
      this.schedule();
    });
  }
  schedule() {
    while (this.running.length < 2 && this.toRun.length > 0) {
      let item = this.toRun.shift();
      let p = item.promiseCreator();
      this.running.push(p);
      p.then(() => {
        this.running.splice(this.running.indexOf(p), 1);
        item.resolve();
        this.schedule();
      });
    }
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output: 2 3 1 4
