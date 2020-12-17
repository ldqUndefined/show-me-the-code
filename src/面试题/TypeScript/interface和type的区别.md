# interface和type的区别

## 概念

interface会创建一个新的类型名称，并且可以在任何地方使用。

type是类型别名的含义，相当于在使用的时候自动换成了等号"="后面的类型。

## 相同点

### 都可以描述一个对象或者函数

interface

```typescript
interface User{
    name:string
}
interface SetUser{
    (name:string) => void
}
```

type

```typescript
type User = {name:string}
type SetUser = (name:string) => void
```

### 都允许拓展

interface和type都可以拓展，interface通过extends进行拓展，type通过&进行拓展。

并且interface可以extends一个type，type也可以&一个interface

```typescript
type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}
```

```typescript
interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

**interface不能extends一个联合类型的type**



## type可以但interface不行的

### type可以声明基本类型

```
type Name = string
```

### type可以声明联合类型

```
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat
```

### type可以声明元组类型

```
interface Dog {
    wong();
}
interface Cat {
    miao();
}
type PetList = [Dog, Pet]
```



## interface可以但type不行的

### interface 能够声明合并

```
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

**重复声明一个type会报错**

## 项目中的使用

一般能用interface实现的都用interface实现，interface命名用大写“I”开头，如`IUserinfo`。

