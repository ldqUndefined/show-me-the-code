# css盒模型

浏览器的渲染引擎会将所有元素表示为一个个矩形的盒子(box)。

css决定这些盒子的大小、位置及属性。

盒子由四个部分组成：

- 内容边界(content edge)
- 内边距边界(padding edge)
- 边框边界(border edge)
- 外边距边界(margin edge)

如果`box-sizing`的值为`content-box(默认)`，则**内容区域**的大小可以明确通过`width、min-width、max-width、height、min-height`和`max-height`控制。

**内边距区域**padding area可以通过`padding`属性控制。

**边框区域**border area由边框边界限制，由`border`属性控制。如果`box-sizing`的值为`border-box`，那么边框区域的大小可以通过`width、min-width、max-width、height、min-height`和`max-height`控制。假如盒模型上设有背景(`background-color`或`background-image`)，**背景会一直延伸到边框的外沿**(默认在边框下层延伸，边框会盖在背景上)。此默认行为可以通过css属性`background-clip`来改变。

**外边距区域** margin area由外边距边界限制，用空白区域扩展边框区域，来分开相邻的袁旭。它的尺寸由`margin`决定。



## background-clip

```
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;//背景被裁剪成文字的前景色
```

默认为border-box，背景延伸到边框下，在边框下沿。

