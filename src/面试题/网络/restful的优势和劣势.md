# restful的优势和劣势

REST -- REpresentational State Transfer 直接翻译：表现层状态转移。

restful是一个架构风格。

- 看URL就知道资源内容
- 看HTTP方法就知道要进行什么操作
- 看HTTP状态码就知道结果如何

URI推荐名词而不是动词，而且推荐使用复数。

提出的想法是让我们在设计系统的时候，资源是第一位的考虑，要从中资源的角度进行系统的拆分、设计，并且规范URI的风格，规范了HTTP请求动作的使用和对应的语义，而不是以操作为角度进行设计。

## 优势

遵循rest风格的URL有很强的可读性，具有自描述性，可以从URI得知资源的内容，从http方法知道要进行的操作，从状态码知道结果。

适合开放性高的API，适合第三方按需进行调用。

提出使用版本号，更加规范。

前端无关化，后端只负责数据处理，前端可以是任何形式的语言(一个接口跨端共用)。

## 劣势

导致uri的设计变复杂了，在复杂的关系、操作、资源的情况下，硬套rest原则设计会非常苦难。

对后端开发人员要求高，业务逻辑有事很难抽象为资源的增删改查。

对前端不友好，API粒度比较粗，很难查询符合特殊要求的数据，同样的业务必普通的API需要更多次HTTP请求。