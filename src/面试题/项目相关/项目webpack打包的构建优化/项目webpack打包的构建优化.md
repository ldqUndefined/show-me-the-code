# 项目webpack打包的构建优化

使用webpack-bundle-analyzer分析构建结果的分包情况，根据需求进行拆包，比如react相关打包到一起，地图相关组件打包到一起

使用speed-measure-webpack-plugin分析构建过程中每个loader和plugin的耗时，根据分析结果对相应的loader和plugin进行优化

添加hard-source-webpack-plugin使用模块缓存，用空间换时间，提升了项目的构建速度。

添加compress-webpack-plugin在开发环境下使用，在构建阶段生成.gz文件，减轻服务器压力

抽取出webpack-runtime，并内嵌到html中，减少所影响的js文件的hash变化，并且减少一次js请求

使用webpack.IgnorePlugin忽略掉moment中的locale文件夹下文件，减少不必要的语言配置文件的引入

使用fork-ts-checker-webpack-plugin将ts的语法检测移动到别的线程中，并且babel-loader只负责ts的编译不负责语法检测，但是语法错误会异步通知webpack，因为同步的话会拖慢编译速度。(以前的同步方案是使用ts-loader，先进行语法检测再进行转译，速度很慢)

通过给babel-loader添加exclude排除一些无需经过babel转译的外部工具函数包，缩小编译范围

设置`optimization.moduleIds:'hashed'`固定模块在对应分包中的键名，否则会由于模块的导入顺序导致js文件的contenthash发生变化。设置`optimization.chunkIds:'named'`，这样就不会因为增删chunk的时候导致chunkId和包含的moduleId同时发生变化，但这只对有名称的chunk有效，对于异步加载的chunk无效，依旧会使用递增的id，所以需要使用webpack.namedChunkPlugin中传递一个自定义的nameResolver，用于配置没有名字的chunk的id。

在路由懒加载页面越来越多之后，每次热更新都很慢，这是由于异步加载导致webpack每次的缓存失效了，可以使用`babel-plugin-dynamic-import-node`在开发环境下把所有的异步加载import()转化为require()同步引入，就解决了热更新缓慢的问题