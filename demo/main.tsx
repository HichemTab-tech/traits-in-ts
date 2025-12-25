// noinspection SuspiciousTypeOfGuard

import {use} from "traits-in-ts";


class Parent{
    prop: string = "parent"
}

class Trait1{
    x: string;
    constructor(){
        this.x = "trait1";
    }

    hello(){
        console.log("hello from trait1");
    }
}

class Trait2{

    hello(x: string){
        console.log("hello from trait2", x);
    }
}


class A extends use([Trait1, Trait2], Parent) {

}

const a  = new A();

//a.prop = "";

console.log(a);

a.hello("");

class Trait3{
    prop33: string = "Hi";
}

class Trait4{
    prop33: string = "Hi";
}

class B extends use([Trait3], A){

}
const b  = new B();

console.log(a.x, a.prop);
console.log(a instanceof B);
console.log(b instanceof Trait3);
console.log(b instanceof Trait1);
