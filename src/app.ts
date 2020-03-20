abstract class Department {
    static fiscalYear = 2020;
    // private readonly id: string;
    // private name: string;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
        // console.log(Department.fiscalYear);
    }

    static createEmployee(name: string) {
        return {name: name};
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        // validation etc
        // this.id = 'd2';
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log('IT Department - ID: ' + this.id);
    }
}


class AccountingDepartment extends Department {
    private static instance: AccountingDepartment;
    private lastReport: string;

    private constructor(protected  id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('habib B22', []);
        return this.instance;
    }

    describe() {
        console.log('Accounting Department - ID: ' + this.id);
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printEmployees() {
        console.log(this.employees);
    }

    printReports() {
        console.log(this.reports);
    }

    printReportsLast() {
        console.log(this.lastReport);
    }
}


const accounting = AccountingDepartment.getInstance();
console.log(accounting);
// const idDepartement = new ITDepartment('B22 -ID',[]);
// idDepartement.describe();
// accounting.addEmployee('Habib');
// accounting.addEmployee('Bellaaj');
// accounting.printEmployees();
// accounting.addReport('ha');
// accounting.addReport('hb');
// accounting.addReport('hs');
// accounting.printReports();
// accounting.printReportsLast();

