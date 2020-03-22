type AddFn = (a: number, b: number) => number;

let add: AddFn;
let addInterface;

add = (n1: number, n2: number) => {
    return n1 + n2;
};

interface AddFnInterface {
    (a: number, b: number): number;
}

addInterface = (n1: number, n2: number) => {
    return n1 + n2;
};

let resultAddInterface = addInterface(60, 80);
let resultAdd = add(20, 80);

console.log(resultAdd);
console.log(resultAddInterface);

interface Named {
    name: string;
}

interface Greetable extends Named {

    age: number;

    greet(phrase: string): void;
}

class Person implements Greetable {
    age: number;
    name: string;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string): void {
        console.log(phrase + ' ' + this.name);
    }

}

let person = new Person('habib', 36);

console.log(person);