# Webpack-loader

## css-loader

在匹配的文件中执行可能的@import和url()查找，并且将他们视为常规的ES6导入。

如果@import指向外部资源，css-loader会跳过它，因为只有内部资源会被webpack处理。

| 名称          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| importLoaders | 告诉webpack在css-loader作用于@import的资源之前有多少个loader，比如当从css文件@import scss文件时，为了处理sass文件，我们需要配置importLoaders:1。 |

## style-loader

通过JS把样式用`<style>`标签的形式插入到DOM中。支持HMR，建议在开发模式使用。

## sass-loader

用于解析sass的loader，有**url重写问题**(如果在sass文件中的url()里使用相对路径，那么都是相对于根sass文件的，所以在非根sass文件里的url()里用相对路径会有问题)，需要在sass-loader**左边**添加resolve-url-loader解决此问题，less-loader同理。

可以用fast-sass-loader提升性能构建速度，并且支持url重写，无需再引用resolve-url-loader。

## mini-css-extract-plugin

帮助我们把样式抽出成独立的css文件。支持按需加载和sourcemap，不支持HMR，建议在生产模式使用。

## postcss-loader

使用postcss的loader，postcss是一个允许使用JS插件转换样式的工具，我们可以在上面添加插件来达成我们想要做的事情，如补齐厂家样式前缀等。

postcss-loader放在scss等loader的左边。

**postcss-preset-env：**

postcss-loader的plugin，使用这个来添加css厂商前缀，使用这个而不是autoprefixer是因为它还除了包含autoprefixer还提供了polyfill。

可以根据package.json里的browserslist字段或者在根目录下新建一个.browserslistrc文件进行配置，如浏览器版本等，以让生成的代码可以正确运行在目标浏览器中。

## eslint-loader

使用eslint检测代码的loader，配置时建议`enforce:'pre'`以确保eslint在其他所有loader之前执行，第一时间捕获到错误。使用`cache:true`，使用缓存加快eslint检测速度。include配置为开发根目录，减少检测范围。

## babel-loader

用babel对js进行转换，以使用javascript新特性，并且生成ES5等浏览器可以正常运行的代码。

通过添加presets让babel-loader以一定的规则运行。

项目中使用babel-loader配合babel的插件编译ts，而不再使用ts-loader，速度更快，然后将类型检查的工作交给fork-ts-checker-webpack-plugin去做。

## url-loader

用来处理图片的loader，内置file-loader(将匹配到的文件输出到指定位置并返回相应的url)，通过配置limit属性，可以让小于limit的图片以base64的方式内联到代码中，减少不必要的请求。

处理svg的loader：

- svg-inline-loader
- svg-sprite-loader
- svg-url-loader
- @svgr/webpack 

## ts-loader

用来转换typescript的loader，性能不太行(需要进行两轮编译，先将TS转换成JS，然后再把JS交给babel-loader编译一遍，比较慢)，项目中使用babel-loader+fork-ts-checker-webpack-plugin的方式进行，用babel-loader配合指定preset进行编译，用fork-ts-checker-webpack-plugin进行类型检查。





