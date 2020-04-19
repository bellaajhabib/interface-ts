
function WithTemplate(template: string, hookId: string) {
    console.log("template Factory")
    return function (constructor: any) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();

        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent += " " + p.name;
        }
    }
}

function Logger(logString: string) {
    console.log("Logger Factory")
    return function (getName: Function) {
        logString;
        getName;
    }
}

@WithTemplate('<h1>My Person Object</h1>', 'app')

@Logger('LOGGING - PERSON')
class Person {
    name = 'Max';

    constructor() {
        console.log(Logger instanceof Object);
    }

    getName() {
        return name;
    }
}
