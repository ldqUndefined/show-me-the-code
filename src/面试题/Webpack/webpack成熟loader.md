# Webpack-loader

## css-loader

在匹配的文件中执行可能的@import和url()查找，并且将他们视为常规的ES6导入。

如果@import指向外部资源，css-loader会跳过它，因为只有内部资源会被webpack处理。

| 名称          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| importLoaders | 告诉webpack在css-loader作用域@import的资源之前有多少个loader，比如当从css文件@import scss文件时，为了处理sass文件，我们需要配置importLoaders:1。 |

## style-loader

把样式通过`<style>`标签插入到DOM中。

## sass-loader

用于解析sass的loader，有**url重写问题**(如果在sass文件中的url()里使用相对路径，那么都是相对于根sass文件的，所以在非根sass文件里的url()里用相对路径会有问题)，需要在sass-loader**左边**添加resolve-url-loader解决此问题，less-loader同理。

可以用fast-sass-loader提升性能构建速度，并且支持url重写，无需再引用resolve-url-loader。

