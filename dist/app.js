"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = (function () {
    function Project(id, tile, description, people, status) {
        this.id = id;
        this.tile = tile;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
var ProjectState = (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    };
    ProjectState.prototype.addListener = function (listenersFn) {
        this.listeners.push(listenersFn);
    };
    ProjectState.prototype.addProject = function (title, description, numOfPeople) {
        var newProjecy;
        newProjecy = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProjecy);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenersFn = _a[_i];
            listenersFn(this.projects.slice());
        }
    };
    return ProjectState;
}());
var proj = ProjectState.getInstance();
function validate(validatableInput) {
    var isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    return isValid;
}
function autobind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
var ProjectList = (function () {
    function ProjectList(type) {
        var _this = this;
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        this.assignement = [];
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this["element"].id = type + "-projects";
        this.templateElement = document.getElementById('project-list');
        proj.addListener(function (projects) {
            var relevantProject = projects.filter(function (prj) {
                if (_this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                ;
                return prj.status === ProjectStatus.Finished;
            });
            _this.assignement = relevantProject;
            _this.renderProjects();
        });
        this.attache();
        this.renderContent();
    }
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById(this.type + "-projects-list");
        listEl.innerHTML = '';
        for (var _i = 0, _a = this.assignement; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            var listItem = document.createElement('li');
            listItem.textContent = prjItem.tile;
            listEl.appendChild(listItem);
        }
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    };
    ProjectList.prototype.attache = function () {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    };
    return ProjectList;
}());
var ProjectInput = (function () {
    function ProjectInput() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this["element"].id = "user-input";
        this.titleElement = this.element.querySelector('#title');
        this.descriptionElement = this.element.querySelector('#description');
        this.peopleElement = this.element.querySelector('#people');
        this.habibElement = this.element.querySelector('#habib');
        this.attache();
        this.configure();
    }
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleElement.value;
        var enteredDescription = this.descriptionElement.value;
        var enteredPeople = this.peopleElement.value;
        var titleValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        var descriptionValidaable = {
            value: enteredTitle,
            required: true,
            min: 2,
            max: 10
        };
        var peopleValidaable = {
            value: +enteredPeople,
            required: true
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidaable) ||
            !validate(peopleValidaable)) {
            alert("Invalid input, please try again!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    };
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            console.log(title + ' ' + desc + ' ' + people);
            proj.addProject(title, desc, people);
        }
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler);
    };
    ProjectInput.prototype.attache = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    __decorate([
        autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}());
var projectInput = new ProjectInput();
var listActive = new ProjectList('active');
var listFinished = new ProjectList('finished');
//# sourceMappingURL=app.js.map