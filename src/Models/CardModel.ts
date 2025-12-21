export class CardModel {
    private id: number;
    private name: string;
    private image: string;
    private description: string;
    private effect: string;

    constructor(id:number = 0, name:string ="", image:string = "", description:string = "", effect:string = "") {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.effect = effect;
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

    // Image
    public get Image(): string {
        return this.image;
    }
    public set Image(image: string) {
        this.image = image;
    }

    // Description
    public get Description(): string {
        return this.description;
    }
    public set Description(description: string) {
        this.description = description;
    }

    // Effect
    public get Effect(): string {
        return this.effect;
    }
    public set Effect(effect: string) {
        this.effect = effect;
    }
}