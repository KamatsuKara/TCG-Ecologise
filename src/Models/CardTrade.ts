import { Card } from "./Card";
import { Trade } from "./Trade";
import { User } from "./User";

export class CardTrade {
    private _trade:Trade;
    private _card:Card;
    private _owner:User;

    constructor(trade:Trade = new Trade(), card:Card = new Card(), owner:User = new User()) {
        this._trade = trade;
        this._card = card;
        this._owner = owner;
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