# Traits in typescript

PHP-inspired trait composition for TypeScript with proper inheritance and runtime `instanceof` support.

`traits-in-ts` is a small experimental utility that explores how PHP-style traits can be implemented in TypeScript without decorators, transpilers, or mixin hacks.

It allows composing classes from multiple traits, preserves constructors, supports inheritance, and provides runtime `instanceof Trait` checks, while keeping strong TypeScript typing.

This project is primarily built for experimentation and learning. It can be used in real projects if you understand the trade-offs and limitations.

## Features

* Multiple traits per class
* Trait constructors are executed
* Works with existing class inheritance
* Traits are inherited by subclasses
* Runtime `instanceof Trait` support
* Accurate TypeScript inference using intersection types

## Installation

```sh
npm install %PACKAGE-NAME%
```

or, if using pnpm:

```sh
pnpm add %PACKAGE-NAME%
```

## Basic usage

### Define traits

```ts
class Trait1 {
  x = "trait1";

  hello() {
    console.log("hello from trait1");
  }
}

class Trait2 {
  hello(name: string) {
    console.log("hello from trait2", name);
  }
}
```

### Compose them into a class

```ts
class A extends use([Trait1, Trait2]) {}
```

### Use the class

```ts
const a = new A();

a.x;            // "trait1"
a.hello("TS");

a instanceof Trait1; // true
a instanceof Trait2; // true
```

## Using traits with an existing parent class

If your class already extends a parent, you can keep it by passing the parent as the second argument to `use`.

```ts
class Parent {
  prop = "parent";
}

class A extends use([Trait1, Trait2], Parent) {}
```

This preserves normal class inheritance while adding traits.

```ts
const a = new A();

a.prop;         // "parent"
a.x;            // from Trait1

a instanceof Parent; // true
a instanceof Trait1; // true
```

## Trait inheritance

Traits are inherited transitively through class inheritance.

```ts
class Trait3 {
  prop33 = "Hi";
}

class B extends use([Trait3], A) {}

const b = new B();

b instanceof Trait1; // true
b instanceof Trait3; // true
```

Traits applied to a parent class are automatically available on subclasses.


## How it works (overview)

* Each trait is instantiated and merged into the target instance
* Trait methods are copied to the composed class prototype
* Trait identity is stored as runtime metadata
* `instanceof Trait` is implemented via `Symbol.hasInstance`
* Trait metadata flows naturally through `super()` calls

Traits are treated as runtime composition metadata rather than inheritance.

## Limitations and notes

* This library is experimental and not production-hardened
* Trait method conflicts are resolved using a “last trait wins” strategy
* Trait constructors receive the same arguments as the class constructor
* `Symbol.hasInstance` is modified on trait classes


## Status

Experimental / educational.

The goal of this project is to explore trait semantics in TypeScript and understand the boundaries of the language.


## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) file for more details.

&copy; 2025 [Hichem Taboukouyout](mailto:hichem.taboukouyout@hichemtab-tech.me)
