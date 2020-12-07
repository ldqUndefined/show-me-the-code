# 打包优化

## 加快构建速度

### 使用高版本的node和webpack

使用高版本的node和webpack可以极大地提升构建速度。

### thread-loader

在并行操作繁重时用thread-loader才值得。因为这个loader的开销也很大。

### parallel-webpack

### DllPlugin

通过把应用依赖的基础模块抽出来，打包到动态链接库中区，在下一次编译时，直接使用动态链接库中的代码，可以提升构建速度。**webpack4中已不推荐使用，提升不高，cra已经默认移除了。**

### 使用@babel/preset-env

根据浏览器版本做更少的转换，生成的高版本代码在目标浏览器版本中也能跑，没必要编译成es5的。

### 开发环境跳过polyfills

开发环境用core-js生成polyfills会增加处理开销。

### 跳过babel-loader等loader

当在高版本的浏览器中进行开发时，可以跳过babel-loaer的编译，因为高版本的浏览器可以运行高版本的js代码。

### 缩小解析范围

让尽可能少的文件被loader处理。在特定的loader中控制test、include和exclude的范围，webpack默认会遍历node_modules，造成不必要的开销。

### output.futureEmitAssets

设置为true会告诉webpack使用未来版本的资源文件emit逻辑，允许在emit后释放资源文件的内存(减少内存使用)。但这可能会破坏那些认为资源文件emit后仍然可读的插件。(webpack5里选项被移除并且默认为true)。

### 热更新加速

由于是单页面应用，当页面中的页面越来越多时，我们会使用页面懒加载来分割页面进行动态加载，但这也会导致热更新变慢。解决方案

使用 babel的**babel-plugin-dynamic-import-node**插件，它做的事情是将素有的import()转化为require()，这样就会把所有的异步组件都通过同步引入，我们通过babel的env环境变量，让它只作用于开发环境，解决重复打包导致热更新慢的问题，这种解决方案对代码的侵入性小，完全交给babel处理，当想换方案的时候直接把babel的这个配置修改了就可以了。

首先在package.json中增加BABEL_ENV。

```json
"dev": "cross-env BABEL_ENV=development webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
```

然后在.babelrc中增加配置。

```json
{
  "env": {
    "development": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```



## 压缩

### 压缩JavaScript

通过将`optimization.minimize`设为true，并且在`optimization.minimizer`数组中配置**terser-webpack-plugin**可以有效安全地压缩js代码。

### 压缩HTML

html-webpack-plugin配置minify属性，如去除空格，去除注释等。

### 压缩CSS

通过将`optimization.minimize`设为true，并且在`optimization.minimizer`数组中配置**optimize-css-assets-webpack-plugin**，可以帮助我们进行css的压缩优化。

### 传输文件压缩

对于已经通过去除空格、去除注释、替换变量名等方式压缩后的文件，我们还可以通过在传输文件时的`Content-Encoding`对文件进行压缩的方式进一步减小文件的大小。原本这一步可以在nginx上配置，让前端请求静态文件的时候由nginx帮我们压缩文件后再进行传输，但那会消耗服务器的性能，所以我们可以在打包构建的时候提前生成.gz文件。

通过使用compression-webpack-plugin，在生产模式下打开，配置生成.gz结尾的文件，并且exclude掉.map结尾的文件，并开启cache以在下次构建中提升生成.gz文件的速度。

## 运行时加速

### 开启Scope hoisting

从webpack4开始，在生产模式中默认开启scope hoisting，将所有模块提升到一个scope中替代以前分离的多个闭包以提升js代码的执行速度(闭包产生的作用域链查找性能低下)。但是构建速度会变慢一点，因为要分析代码进行scope hoisting。

## Tree Shaking

由于es6 module是静态分析的，所以我们可以在运行代码之前的静态分析阶段，就把没有应用到的代码给“shake”掉，就像从依赖树上“摇”掉没用上的叶子一样。

当我们结合typescript一起使用时，我们需要把`compilerOptions.module`设为`es2015`或者等价的值。这是为了保留es6模块定义给webpack进行tree-shaking。

在babel的方面，我们需要设置modules:false，以保留es6模块，否则经过babel编译的代码不具备静态分析的功能。

需要在一些loader设置sideEffects:false来告诉webpack在loader转换的过程中没有产生副作用，可以正常进行静态分析和tree-shaking。对于css来说，需要手动设置sideEffects:true来告诉webpack它的导入产生了副作用，否则css文件有可能会被shake掉。

对于第三方包，有些需要使用babel-plugin-transform-imports插件来帮助我们重写导入，防止我们在使用某个小功能的时候引入整个包，增大了应用的体积。

## 文件指纹(hash)

通过配置输出文件的文件指纹，我们可以很好地利用浏览器缓存，以及在版本更新的时候，减少不必要的文件指纹的变化，更高效地利用文件指纹进行缓存。一般打包出的js文件使用chunkhash，以代码分割的颗粒度设置文件指纹，css使用contenthash，这样当同个chunk中的js发生变化，但css没有发生变化时，文件指纹不会更新，只有对应的css文件内容发生变化时，css的文件指纹才会更新，可以更精确地利用缓存。

### moduleId

打包的时候，默认每个export对应一个模块id，这个模块id是根据从入口开始的依赖树的深度优先中遍历顺序决定的，所以当我们在某个位置添加一个新的import导入新的文件时，有可能会影响模块的导入顺序，也会影响到模块id，这会导致打包出的chunk文件的chunkhash导致变化，所以我们需要通过配置`optimization.moduleIds:hash`来保证不会影响到文件chunkhash的变化，而在开发环境可以配置成`optimization.moduleIds:named`以带有模块相对路径的方式提升调试体验。

### chunkId

打包的时候，默认每个chunk也会对应一个chunkId，但是当我们使用动态加载的时候，新增或减少动态加载的模块时，会导致打包出来的chunkId变化，所以我们在开发的时候配置`optimization.chunkIds:named`来提升调试体验，通过给`webpack.namedChunksPlugin`配置一个自定义的chunk命名函数来保证chunkId的不变。

## 抽离webpack运行时

webpack打包的时候，会维护自己的运行时代码，运行时代码包含了要加载的文件清单(manifest)，即对应的js和css文件名/地址，如果这些文件的文件名变化了(比如修改了这些chunk文件的代码)，那么这份清单也会发生变化，也会导致包含这份清单的文件内容发生变化，也就导致了包含这份清单的文件的文件指纹发生变化，无法很好地利用缓存。

出于这个原因，我们可以把webpack的运行时代码抽离成一个文件，或者将运行时代码内联到index.html中，这样就可以减小由于初始化时需要加载的文件发生变化时而产生的影响。

我们可以通过在`optimization.runtimeChunk`配置webpack运行时代码的名称，将其抽离出来。

因为我们已经使用了**html-webpack-plugin**，它会自动帮我们把js文件放在`<script>`标签中。

因为生成的webpack运行时代码很小，我们可以使用**react-dev-utils/InlineChunkHtmlPlugin**将生成的包含runtime的js文件内联到index.html文件中，可以减少一次http请求。

## 减少不必要的第三方包代码

通过添加`webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)`来忽略掉Moment.js的locale文件。





