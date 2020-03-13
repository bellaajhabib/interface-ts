class Departement {
    name : string;
      id : string;
   public employees:string[]=[];
    constructor(n: string,   readonly is :string="habib") {
    this.name = n;
        this.is="q";
        this.id = is;
    }

    describe(this: Departement){
      console.log('Department: ' +`${this.id} `);
    }
    addEmployee(employee:string){
         this.employees.push(employee);
    }
    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartement extends Departement{
    public  userAdmin:string[]=[];
 constructor(id: string, public admins: string[]) {
     super(id,'IT');
     this.userAdmin= admins;

 }
   addAdminEmpolyee(){
       this.employees.push(`${this.userAdmin} `);
    }
    printAmdinEmpolyee(){
     if(this.employees){
         return this.employees;
     }
    throw new Error('No report found.');

    }
    setEmpolyee(adminUsers: string [] ){
    this.employees.push(...adminUsers);
    }
}
const accounting = new Departement('Accounting');
const itdDepartement = new ITDepartement('Id',['admin','user']);
itdDepartement. addAdminEmpolyee();
itdDepartement. setEmpolyee(['salma']);
console.log(itdDepartement. printAmdinEmpolyee());
// accounting.describe();
// accounting.addEmployee("Bellaaj");
// accounting.addEmployee("Mohamed");
// accounting.addEmployee("Habib");
// accounting.employees[0]="Anna";
// accounting.printEmployeeInformation();



// const accountingCopy = { name : "habib" , describe : accounting.describe}
// accountingCopy.describe();