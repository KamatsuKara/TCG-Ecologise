import { User } from "./User";
import { CardModel } from "./CardModel";
import { Rarity } from "./Rarity";

export class Card {
    private id: number;
    private owner: User;
    private model: CardModel;
    private rarity: Rarity;
    private create: number;
    private obtened: number;

    constructor(id:number, owner:User, model:CardModel, rarity:Rarity, create:number = Date.now(), obtened:number = Date.now()){
        this.id = id;
        this.owner = owner;
        this.model = model;
        this.rarity = rarity;
        this.create = create;
        this.obtened = obtened;
    }

    public getId():number{
        return this.id;
    }

    public getOwner():User{
        return this.owner;
    }

    public getModel():CardModel{
        return this.model;
    }

    public getRarity():Rarity{
        return this.rarity;
    }

    public getCreate():number{
        return this.create;
    }
    
    public getObtened():number{
        return this.obtened;
    }
}