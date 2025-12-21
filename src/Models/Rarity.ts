export class Rarity {
    private id: number;
    private name: string;

    constructor(id:number = 0, name:string = ""){
        this.id = id;
        this.name = name;
    }
    
    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Name
    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }
}