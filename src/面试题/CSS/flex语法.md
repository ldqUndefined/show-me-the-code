# Flex语法

flex是弹性盒子，是display的一个可选值，当容器使用`display:flex`时，元素会变成弹性盒子，可以响应式地实现很多页面布局。

## 概念

![flex布局](./图片/flex布局.PNG)

- mian axis：主轴(默认水平)
- cross axis：交叉轴(默认垂直)
- main start：主轴开始位置
- main end：主轴结束位置
- cross start：交叉轴开始位置
- cross end：交叉轴结束位置
- main size：单个项目占据主轴的空间
- cross size：单个项目占据交叉轴的空间

## 容器属性

- flex-direction：主轴方向
- flex-wrap：主轴排不下时的换行方式
- flex-flow：flex-direction和flex-wrap的简写
- justify-content：项目在主轴上的对齐方式
- align-items：项目在交叉轴上的对齐方式
- align-content：多根轴线对齐方式

### 项目属性

- order：项目的排列顺序，数值越小，排列越靠前。
- flex-grow：项目的放大比例，默认为0，即不放大，为1时候想剩余项目等分。
- flex-shtink：项目的缩小比例，默认为1，即空间不足时，等比例缩小，为0时缩小。
- flex-basis：在分配多余的空间之前，项目占据的主轴空间。默认auto，项目本来大小。
- flex：flex-grow、flex-shrink、flex-basis的缩写
- align-self：允许当个项目和其他项目有不一样的对齐方式，覆盖父元素align-items的属性。默认为auto，继承父元素的align-items属性。







