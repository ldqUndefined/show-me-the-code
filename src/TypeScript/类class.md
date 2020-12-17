# 类class

## 属性修饰符

### public

属性默认是public的。所以我们可以在使用的任何时候获取这些属性，从实例的内部或者外部获取。

### private

TS3.8支持了JavaScript的新语法私有域：

通过在属性面前加`#`来标识属性的私有属性：

```
class Animal {
  #name: string;
  constructor(theName: string) {
    this.#name = theName;
  }
}

new Animal("Cat").#name;
Property '#name' is not accessible outside class 'Animal' because it has a private identifier.
```

这个私有域的实现是js运行时内建的，所以更好的进行私有域的隔离，所以私有属性的最佳使用方式是使用#声明。

而TypeScript在低版本的时候就实现了自己的私有private

```
class Animal {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

new Animal("Cat").name;
Property 'name' is private and only accessible within class 'Animal'.
```

这是typeScript层面对属性的访问进行的拦截，不影响运行时，所以不太推荐使用。

当对比两个有private和protected的类型时，如果一个成员有private属性，那么另一个需要从同一个源生继承该private属性才行，否则会出错。protected也是。

```
class Animal {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class Rhino extends Animal {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee;//error
//Type 'Employee' is not assignable to type 'Animal'.
  //Types have separate declarations of a private property 'name'.
```

### protected

标识一个属性可以在子类中访问。

### Readonly

标识一个属性在初始化之后就不能修改，修改会报错。

## 静态属性static

定义在类上的属性