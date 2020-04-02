"use strict";
var e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString() + ' -';
    }
    return a.toString() + b;
}
var result = add(true, ' Bellaaj');
result.split(' ');
console.log(result);
//# sourceMappingURL=app.js.map