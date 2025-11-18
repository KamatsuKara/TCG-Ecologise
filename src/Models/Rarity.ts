export class Rarity {
    private id: number;
    private name: string;

    constructor(id:number = 0, name:string = ""){
        this.id = id;
        this.name = name;
    }
    
    public getId():number{
        return this.id;
    }

    public getName():string{
        return this.name;
    }
}