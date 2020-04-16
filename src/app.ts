function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return 'Value' + obj[key];
}

console.log(extractAndConvert({name: 'Habib', job: 'AC'}, 'job'));

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;

}

function createCourseGoal(
    title: string,
    description: string,
    date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}

let course = createCourseGoal('habib', 'this my describe', new Date());
let courseGoal: Partial<CourseGoal> = {}
const names: Readonly<string[]> = ["Max", "Anna"];


class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
//textStorage.removeItem('Max');
console.log(textStorage.getItems());

