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

