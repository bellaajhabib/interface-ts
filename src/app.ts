//project Type
enum ProjectStatus {
    Active,
    Finished
}

class Project {
    constructor(
        public id: string,
        public tile: string,
        public description: string,
        public people: number,
        public status: ProjectStatus,
    ) {

    }
}

// Project State Management
type Listener = (items: Project[]) => void;

//Project State Management
class ProjectState {
    private static instance: ProjectState;
    private listeners: Listener [] = [];
    private projects: any [] = [];

    constructor() {
    }

    static getInstance() {
        if (this.instance) {

            return this.instance;
        }
        this.instance = new ProjectState();

        return this.instance;
    }

    addListener(listenersFn: Listener) {

        this.listeners.push(listenersFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        let newProjecy: Project;
        newProjecy = new Project(Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active);

        this.projects.push(newProjecy);
        for (const listenersFn of this.listeners) {
            listenersFn(this.projects.slice());
        }
    }
}

const proj = ProjectState.getInstance();

// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength
    }
    return isValid;
}

// autobind decorator
function autobind(_: any,
                  _2: string,
                  descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get(): any {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };

    return adjDescriptor;
}

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    assignement: Project[];
    protected type: 'active' | 'finished';

    constructor(type: 'active' | 'finished') {
        this.type = type;
        this.templateElement = document.getElementById('project-list') ! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        this.assignement = [];

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        )
        this.element = importedNode.firstElementChild ! as HTMLFormElement;
        this["element"].id = `${type}-projects`;
        this.templateElement = document.getElementById('project-list') ! as HTMLTemplateElement;
        proj.addListener((projects: Project[]) => {

            const relevantProject = projects.filter(prj => {

                if (this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                ;
                return prj.status === ProjectStatus.Finished;
            });
            this.assignement = relevantProject;
            this.renderProjects();
        });
        this.attache();
        this.renderContent();


    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignement) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.tile;
            listEl.appendChild(listItem);
        }
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }

    private attache() {
        this.hostElement.insertAdjacentElement('beforeend', this.element)
    }
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;
    habibElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input') ! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement
        const importedNode = document.importNode(
            this.templateElement.content,
            true
        )

        this.element = importedNode.firstElementChild ! as HTMLFormElement;
        this["element"].id = "user-input";
        this.titleElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleElement = this.element.querySelector('#people') as HTMLInputElement;
        this.habibElement = this.element.querySelector('#habib') as HTMLInputElement;
        this.attache();
        this.configure();
    }

    private gatherUserInput(): [string, string, number] | undefined {
        const enteredTitle = this.titleElement.value;
        const enteredDescription = this.descriptionElement.value;
        const enteredPeople = this.peopleElement.value;
        const titleValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const descriptionValidaable: Validatable = {
            value: enteredTitle,
            required: true,
            min: 2,
            max: 10
        }
        const peopleValidaable: Validatable = {
            value: +enteredPeople,
            required: true
        }
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidaable) ||
            !validate(peopleValidaable)
        ) {
            alert(`Invalid input, please try again!`);
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title + ' ' + desc + ' ' + people);
            proj.addProject(title, desc, people);
            //this.clearInput();
        }


    }

    // private clearInput(){
    //     this.titleElement.value='';
    //     this.descriptionElement.value='';
    //     this.peopleElement.value='';
    // }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    private attache() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

let projectInput = new ProjectInput();
let listActive = new ProjectList('active');
let listFinished = new ProjectList('finished');

