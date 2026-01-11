import { Card } from "./Card";
import { Trade } from "./Trade";
import { User } from "./User";

export class CardTrade {
    private _id:number;
    private _trade:Trade;
    private _card:Card;
    private _owner:User;

    constructor(id:number, trade:Trade, card:Card, owner:User) {
        this._id = id;
        this._trade = trade;
        this._card = card;
        this._owner = owner;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Trade
    public get trade(): Trade {
        return this._trade;
    }
    public set trade(trade: Trade) {
        this._trade = trade;
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
}