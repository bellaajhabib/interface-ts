"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function WithTemplate(template, hookId) {
    console.log("template Factory");
    return function (constructor) {
        var hookEl = document.getElementById(hookId);
        var p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1').textContent += " " + p.name;
        }
    };
}
function Logger(logString) {
    console.log("Logger Factory");
    return function (getName) {
        logString;
        getName;
    };
}
var Person = (function () {
    function Person() {
        this.name = 'Max';
        console.log(Logger instanceof Object);
    }
    Person.prototype.getName = function () {
        return name;
    };
    Person = __decorate([
        WithTemplate('<h1>My Person Object</h1>', 'app'),
        Logger('LOGGING - PERSON')
    ], Person);
    return Person;
}());
//# sourceMappingURL=app.js.map