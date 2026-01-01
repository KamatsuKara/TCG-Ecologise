export class CardModel {
    private _id: number;
    private _name: string;
    private _image: string;
    private _description: string;
    private _effect: string;

    constructor(id:number = 0, name:string ="", image:string = "", description:string = "", effect:string = "") {
        this._id = id;
        this._name = name;
        this._image = image;
        this._description = description;
        this._effect = effect;
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

    // Image
    public get image(): string {
        return this._image;
    }
    public set image(image: string) {
        this._image = image;
    }

    // Description
    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
    }

    // Effect
    public get effect(): string {
        return this._effect;
    }
    public set effect(effect: string) {
        this._effect = effect;
    }
}