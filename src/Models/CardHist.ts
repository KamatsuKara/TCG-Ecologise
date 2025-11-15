import { Card } from "./Card";
import { User } from "./User";

export class CardHist {
    private id: number;
    private card: Card;
    private owner: User;
    private obtened: number;

    constructor(id:number, card:Card, owner:User, obtened:number){
        this.id = id;
        this.card = card;
        this.owner = owner;
        this.obtened = obtened;
    }

    public getId():number{
        return this.id;
    }

    public getCard():Card{
        return this.card;
    }

    public getOwner():User{
        return this.owner;
    }

    public getObtened():number{
        return this.obtened;
    }
}