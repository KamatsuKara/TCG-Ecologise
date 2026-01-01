export class Rarity {
    private _id: number;
    private _name: string;

    constructor(id:number = 0, name:string = ""){
        this._id = id;
        this._name = name;
    }
    
    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Name
    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }
}