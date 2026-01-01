import { User } from "./User";
import { CardModel } from "./CardModel";
import { Rarity } from "./Rarity";

export class Card {
    private _id: number;
    private _owner: User;
    private _cardModel: CardModel;
    private _rarity: Rarity;
    private _created: number;
    private _obtened: number;

    constructor(id:number = 0, owner:User = new User(), cardModel:CardModel = new CardModel(), rarity:Rarity = new Rarity(), created:number = Date.now(), obtened:number = Date.now()){
        this._id = id;
        this._owner = owner;
        this._cardModel = cardModel;
        this._rarity = rarity;
        this._created = created;
        this._obtened = obtened;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Owner
    public get owner(): User {
        return this._owner;
    }
    public set owner(owner: User) {
        this._owner = owner;
    }

    // CardModel
    public get cardModel(): CardModel {
        return this._cardModel;
    }
    public set cardModel(cardModel: CardModel) {
        this._cardModel = cardModel;
    }

    // Rarity
    public get rarity(): Rarity {
        return this._rarity;
    }
    public set rarity(rarity: Rarity) {
        this._rarity = rarity;
    }

    // Created
    public get created(): number {
        return this._created;
    }
    public set created(created: number) {
        this._created = created;
    }

    // Obtened
    public get obtened(): number {
        return this._obtened;
    }
    public set obtened(obtened: number) {
        this._obtened = obtened;
    }
}