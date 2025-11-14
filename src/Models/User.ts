export class User {
    private id: number;
    private name: string;
    private create: number;

    constructor(id:number, name:string, create:number = Date.now()){   
        this.id = id;
        this.name = name;
        this.create = create;
    }

    public getId():number{
        return this.id;
    }

    public getName():string{
        return this.name;
    }

    public getCreate():number{
        return this.create;
    }
}