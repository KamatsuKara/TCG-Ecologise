export class BoosterModel {
    private _id: number;
    private _name: string;
    private _nmbCard: number;
    private _category: string;

    constructor(id: number, name: string, nmbCard: number, category: string) {
        this._id = id;
        this._name = name;
        this._nmbCard = nmbCard;
        this._category = category;
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

    // NmbCard
    public get nmbCard(): number {
        return this._nmbCard;
    }
    public set nmbCard(nmbCard: number) {
        this._nmbCard = nmbCard;
    }

    // Category
    public get category(): string {
        return this._category;
    }
    public set category(category: string) {
        this._category = category;
    }
}