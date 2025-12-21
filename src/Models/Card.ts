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

    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Owner
    public get Owner(): User {
        return this.owner;
    }
    public set Owner(owner: User) {
        this.owner = owner;
    }

    // CardModel
    public get CardModel(): CardModel {
        return this.cardModel;
    }
    public set CardModel(cardModel: CardModel) {
        this.cardModel = cardModel;
    }

    // Rarity
    public get Rarity(): Rarity {
        return this.rarity;
    }
    public set Rarity(rarity: Rarity) {
        this.rarity = rarity;
    }

    // Created
    public get Created(): number {
        return this.created;
    }
    public set Created(created: number) {
        this.created = created;
    }

    // Obtened
    public get Obtened(): number {
        return this.obtened;
    }
    public set Obtened(obtened: number) {
        this.obtened = obtened;
    }
}