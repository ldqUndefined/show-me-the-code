# CSS会阻塞页面渲染吗？怎么解决？怎么做到只加载首页css

css会阻塞页面渲染，这是因为渲染树的合成需要dom和cssom，css不会阻塞dom的解析。

js会阻塞dom的解析和渲染。

当解析到JS时，如果前面还存在没有解析完成的css时，则当前js解析会被阻塞(因为js可能操作dom的style属性，只能等css完成解析)，直到前面css都完成解析，也就是在js解析的过程中，js被css解析阻塞，js同时阻塞了dom解析，所以css解析间接阻塞了dom的解析。



解决方法：

- js设置为defer或async
- 动态插入外联js
- js放在body底部
- css放在head中



