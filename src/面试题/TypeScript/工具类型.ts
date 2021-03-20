type Partial_My<T> = { [k in keyof T]?: T[k] };

type Required_My<T> = { [k in keyof T]-?: T[k] };

type Readonly_My<T> = { readonly [k in keyof T]: T[k] };

type Record_My<K extends keyof any, T> = { [P in K]: T };

type Pick_My<T, K extends keyof T> = { [P in K]: T[K] };

type Extract_My<T, U> = T extends U ? T : never;

type Exclude_My<T, U> = T extends U ? never : T;

type Omit_My<T, K extends keyof T> = Pick_My<T, Exclude_My<keyof T, K>>;

type NonNullable_My<T> = T extends null | undefined ? never : T;

type Parameters_My<T extends (...args: any) => any> = T extends (
  ...args: infer U
) => any
  ? U
  : never;

type ConstructorParameters_My<
  T extends new (...args: any) => any
> = T extends new (...args: infer U) => any ? U : never;

type returnType_My<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer U
  ? U
  : any;

type InstanceType_My<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer U
  ? U
  : any;

type a = {
  name: string;
  gggg?: number;
  ttt: boolean;
  sss: () => void;
};
type test = Readonly_My<a>;
type test2 = Record_My<'21' | '421', a>;
