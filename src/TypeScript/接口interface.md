# 接口interface

## 类型检测

TypeScript的核心原则是：类型检查的重点是值的形状。

这有时也叫“鸭子类型”或者“结构类型”，interface负责命名这些类型。

```
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

上面的例子我们可以看出虽然myOjb比所需的类型多了个size，但是并没有报错，这是因为typescript的类型检测时基于“值的形状”的。

只要值有必须的属性，并且类型正确时，就可以通过类型检测，多属性并不影响类型检测。

并且属性的顺序没有影响。

## 可选属性

并非interface的所有属性都是必须的，有一些属性在特定的情况下存在或不存在。这些属性称为可选属性。

可选属性通过使用`?:`标出：

```
interface SquareConfig {
  color?: string;
  width?: number;
}
//color和width都是可选的
```

## 只读属性

有些属性只能在对象初始化的时候赋值，我们可以通过在属性名前使用`readonly`标出。

```
interface Point {
  readonly x: number;
  readonly y: number;
}
```

在初始化之后对`readonly`属性赋值会报错。

typescript有一个泛型只读数组`ReadonlyArray<T>`，和`Array<T>`差不多，但是不能使用任何会修改数组本身的方法，也不能赋值给普通数组。只读数组一般用来保证你在创建之后不会修改数组。

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

ro[0] = 12; // error!
//Index signature in type 'readonly number[]' only permits reading.
ro.push(5); // error!
//Property 'push' does not exist on type 'readonly number[]'.
ro.length = 100; // error!
//Cannot assign to 'length' because it is a read-only property.
a = ro; // error!
//The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
```

最后一行我们可以看到把只读数组赋值给普通数组也会报错，我们可以通过类型断言来阻止报错。

```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

a = ro as number[];
```

readonly 和 const

判断readonly和const的使用场景：对变量用const，对属性用readonly。

## 多余属性检测

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

let mySquare = createSquare({ colour: "red", width: 100 });
//Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
  Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
```

按照typescript的基于“值的形状”来进行类型检测的话，上面的代码应该是不会报错的，但是对于typescript编译器来说，还是认为这段代码出错了，这是因为对于**“对象字面量”**在**赋值，或者当做参传递**的时候typescript会进行**多余属性检测**，如果一个对象字面量有目标类型没有的属性时，就会报错，这是出于避免开发者在使用对象字面量时发生拼写错误的情况。

简单的解决方式是使用类型断言：

```
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

更好的解决方式是在你确保对象在某些情况下时会有额外的属性时使用字符串索引签名：

```
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

还有一种解决方式是将对象字面量赋值给一个变量先：这样就不会进行多余属性检测。

```
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

上面的几种情况发生在值和类型之间有共同属性时，也就是`width`，当没有共同属性时，编译器也会报错。

```
let squareOptions = { colour: "red" };
let mySquare = createSquare(squareOptions);
//Type '{ colour: string; }' has no properties in common with type 'SquareConfig'.
//不存在相同属性
```

## 函数类型

interface不止可以描述对象类型，还可以描述函数类型。为了用interface描述函数类型，我们可以给interface一个调用签名，调用签名看起来像函数声明，但只有参数类型和返回值类型，每个参数都需要名称和类型。

```
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

参数的名称在声明和赋值时不需要相同，只需要保证对应的位置的类型匹配即可。

## 索引类型

我们可以描述那些通过索引访问的的类型如`a[10]`， `ageMap["daniel"]`等。

可索引类型有**索引签名**用来描述我们我们可以用来索引对象的索引类型。

```
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

上面的例子中当我们通过数字类型访问`StringArray`类型时，会返回字符串类型。

有两种支持的索引类型：字符串索引、数字索引。

可以同时支持两种索引方式，但是数字索引的返回值必须是字符串索引返回值的子类型(也就是数字索引的返回值的类型必须可以赋值给字符串索引返回值的类型)。这是因为当我们使用数字索引的时候，js其实是把它转换成了对应的字符串。

```
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal;
Numeric index type 'Animal' is not assignable to string index type 'Dog'.
  [x: string]: Dog;
}
```

当使用字符串索引时，其他所有属性的类型，必须能够赋值给字符串索引类型的返回值。

```
interface NumberDictionary {
  [index: string]: number;
  length: number; // ok, length is a number
  name: string; // error, the type of 'name' is not a subtype of the indexer
//Property 'name' of type 'string' is not assignable to string index type 'number'.
}
```

```
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

我们还可以使用readonly索引签名防止赋值给对应的索引。

```
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
//Index signature in type 'ReadonlyStringArray' only permits reading.
```

## Class 类型

class类型可以实现(implements)一个接口(interface)。

interface描述了类的公共(public)实例属性，所以对于**非公共**或者**静态属性**。

## 继承接口

接口可以继承其他接口，提供了我们重用接口的可能。

一个接口可以继承多个接口。

## 混合类型

因为接口可以描述对象也可以描述函数，而由于函数也是对象的一种，所以函数上有时也会有对应的属性。

```
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
```



