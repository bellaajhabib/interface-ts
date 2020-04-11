function merge<T extends object, U extends object>(objA: T, objB: U) {
    let objA1 = objA;
    let objB1 = objB;
    const returnedTarget = Object.assign(objA1, objB1);

    return returnedTarget;
}

const mergedObject = merge({name: 'Habib', hobbies: ['Eat']}, {age: 36});

interface lengthy {
    length: number;
    push: any;

    toLocaleString(): string;


}

function countAndDescribe<T extends lengthy>(element: T): [number, T] {
    console.log(element.toLocaleString());
    element.push("e");

    return [element.length, element];
}

//console.log(countAndDescribe(['My dream is to fly !','What about me !']));
//countAndDescribe('My dream is to fly !');

function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return 'Value' + obj[key];
}

console.log(extractAndConvert({name: 'Habib', job: 'AC'}, 'job'));
