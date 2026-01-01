import { Card } from "./Card";
import { User } from "./User";

export class CardHist {
    private _id: number;
    private _card: Card;
    private _owner: User;
    private _obtened: number;

    constructor(id:number = 0, card:Card = new Card(), owner:User = new User(), obtened:number = Date.now()){
        this._id = id;
        this._card = card;
        this._owner = owner;
        this._obtened = obtened;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Card
    public get card(): Card {
        return this._card;
    }
    public set card(card: Card) {
        this._card = card;
    }

    // Owner
    public get owner(): User {
        return this._owner;
    }
    public set owner(owner: User) {
        this._owner = owner;
    }

    // Obtened
    public get obtened(): number {
        return this._obtened;
    }
    public set obtened(obtened: number) {
        this._obtened = obtened;
    }
}