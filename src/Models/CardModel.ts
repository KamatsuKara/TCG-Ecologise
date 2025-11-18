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

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getImage(): string {
        return this.image;
    }

    public getDescription(): string {
        return this.description;
    }

    public getEffect(): string {
        return this.effect;
    }
}