"use strict";
function merge(objA, objB) {
    var objA1 = objA;
    var objB1 = objB;
    var returnedTarget = Object.assign(objA1, objB1);
    return returnedTarget;
}
var mergedObject = merge({ name: 'Habib', hobbies: ['Eat'] }, { age: 36 });
function countAndDescribe(element) {
    console.log(element.toLocaleString());
    element.push("e");
    return [element.length, element];
}
function extractAndConvert(obj, key) {
    return 'Value' + obj[key];
}
console.log(extractAndConvert({ name: 'Habib', job: 'AC' }, 'job'));
//# sourceMappingURL=app.js.map