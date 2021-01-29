# babel原理

babel的转译分为三个阶段：解析(parsing)、转换(transforming)、生成(generating)。

babel核心包：

- babel-core：转译器本身，提供了babel的转译API，如babel.transform等，用于对代码进行转译
- babylon：js的词法解析器
- babel-traverse：用于对AST的遍历，供plugin使用
- babel-generator：根据AST生成代码

babel的执行过程：

1. 源代码输入
2. babylon进行解析得到抽象语法树(AST)
3. 使用的插件(plugin)用babel-traverse对AST树进行遍历转译，得到新的AST树
4. 使用babel-generator通过AST生成目标代码

