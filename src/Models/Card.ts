import { User } from "./User";
import { CardModel } from "./CardModel";
import { Rarity } from "./Rarity";

export class Card {
    private id: number;
    private owner: User;
    private cardModel: CardModel;
    private rarity: Rarity;
    private created: number;
    private obtened: number;

    constructor(id:number = 0, owner:User = new User(), cardModel:CardModel = new CardModel(), rarity:Rarity = new Rarity(), created:number = Date.now(), obtened:number = Date.now()){
        this.id = id;
        this.owner = owner;
        this.cardModel = cardModel;
        this.rarity = rarity;
        this.created = created;
        this.obtened = obtened;
    }

    public getId():number{
        return this.id;
    }

    public getOwner():User{
        return this.owner;
    }

    public getCardModel():CardModel{
        return this.cardModel;
    }

    public getRarity():Rarity{
        return this.rarity;
    }

    public getCreated():number{
        return this.created;
    }
    
    public getObtened():number{
        return this.obtened;
    }
}