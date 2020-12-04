# webpack插件

## html-webpack-plugin

简化了html文件的创建，这对于在文件名中包含每次随着编译而发生变化hash的webpack bundle非常有用。

在不使用生成html文件的插件的情况下，每次我们都需要将准备好的index.html文件放到打包输出的文件夹中，并且手动设置script的src等于新生成的入口文件的地址(正常使用webpack每次生成的入口文件的hash值基本都不同，并且每次构建前我们基本都会先删除之前构建的文件夹)。这样的效率重复工作是不可接受的，所以我们可以使用html-webpack-plugin插件帮我们自动生成html文件到构建输出的文件夹中。

html-webpack-plugin帮助我们生成一个html文件到指定位置，并且通过script标签在body的最后面插入并引用webpack生成的所有bundles。

**如果我们使用了mini-css-extract-plugin插件提取css文件的话，它们会被通过link标签插入到head中。**

如果有其他插件使用到html-webpack-plugin，要记得把html-webpack-plugin放到所有引用到它的插件的前面。

核心api：

| 字段名   | 可选值                            | 默认值                      | 描述                                                         |
| -------- | --------------------------------- | --------------------------- | ------------------------------------------------------------ |
| inject   | true\|\|'head'\|\|'body'\|\|false | true                        | 传true或者'body'时会把js资源插入到body底部。'head'会把js文件放到head中。 |
| template | String                            | 无                          | html模板的相对值或绝对值                                     |
| minify   | Boolean\|\|Object                 | 生产模式true，开发模式false | 用于优化、压缩html模板的配置值，可以配置移除备注、去除空格、压缩JS、压缩css等 |

## case-sensitive-paths-webpack-plugin

强制执行所有必须模块的完整路径要与磁盘上实际路径的大小写完全匹配。

这个插件是用于防止由于开发人员使用windows/macOS/Linux等不同系统进行开发时由于路径匹配导致无法解析到对应模块的问题，因为macOS上默认路径大小写是不敏感的，所以有可能在mac上找得到的模块在windows上找不到。

## react-dev-utils

这里里面有各种react开发中会用到的插件

## fork-ts-checker-webpack-plugin

加快ts检测速度的插件，使用另外的线程帮我们进行ts的类型检测，配合babel-loader进行ts的编译，加快每次修改代码时的构建速度。

这个插件使用的是typescript的模块解析，所以tsconfig.json要配置正确。使用typescript的模块解析是处于性能考虑，这样就无需等待webpack去编译文件了。

| 键名  | 作用                                                         |
| ----- | ------------------------------------------------------------ |
| async | 如果设为true，则在webpack编译完之后进行报错，所以不会阻塞编译，开发模式设为true，生产环境设为false，一有类型报错就停止编译。 |

## clean-webpack-plugin

用来在每次构建新的输出之前把上次打包的输出清理掉。

## webpack.DefinePlugin

允许在编译时创建配置的全局常量，帮助我们区分开发模式和生产模式，以及在webpack打包时会用到的全局环境变量。

## webpack-manifest-plugin

使用这个插件来帮助我们生成对应的资源清单(assets manifest)json文件，帮助我们从文件的名称映射到文件的地址。前后端分离貌似用不到这个json文件，服务端渲染貌似用的上(用于查找文件对应的路径)。

## webpack-bundle-analyzer

生成可以缩放的树图帮我们分析打包的构成。

## speed-measure-webpack-plugin

可以帮助我们分析构建过程中各个loader和plugin所花费的时间，不可以和**hard-source-webpack-plugin**插件同时使用。

## webpack.optimize.ModuleConcatenationPlugin

由于webpack运行时的requrire方法会导致闭包问题，所以可以通过把闭包的内容都提升到最上层的模块中，以减少闭包的变量查找过程中的性能损耗，这就是**scope hoisting**。在生产环境默认开启。





