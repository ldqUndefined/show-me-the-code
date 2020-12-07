# webpack4持久缓存最佳实践

首先是最基础的将库代码与业务代码分离，这样我们在修改业务代码的时候，不会导致库代码相关的chunk的hash发生变化。

然后就是chunk Id和module Id，因为默认情况下chunks和modules都以顺序的数字作为其唯一id，由于chunk中的module需要缓存到入口文件的modules变量中，为了保证id的唯一，多个chunk之间的module id也是连续的。这样的情况下：

一、我们在一个chunk中增删一个module的时候，就会导致其他chunk中的moduleId发生改变。

二、我们增删chunk，更会导致其他chunk的chunkId和包含的moduleId同时发生改变。

所以这样chunk文件无法使用稳定的hash作为标识。

在webpack4中，我们可以配置`namedChunks:true`对chunk进行稳定命名，使用`moduleIds:'hashed'`对模块的Id进行稳定的hash。

除了固定chunkId和moduleId，我们还需要在`output`中配置`chunkFileName: '[name].[contenthash:8].js'`使用contenthash来确保稳定的hash。

上面这种固定chunkId的方法只对有名称的chunk有效，对于异步加载即import()加载的chunk无效，依旧会使用递增的id，所以我们需要使用webpack.NamedChunkPlugin中传递一个函数，用于配置对于没有自己名称的chunk也能生成稳定的名称。



webpack5对于chunkIds和moduleIds都提供了一个`deterministic`字段用于生成稳定的名称。