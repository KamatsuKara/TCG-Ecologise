import { Card } from "./Card";
import { User } from "./User";

export class CardHist {
    private id: number;
    private card: Card;
    private owner: User;
    private obtened: number;

    constructor(id:number = 0, card:Card = new Card(), owner:User = new User(), obtened:number = Date.now()){
        this.id = id;
        this.card = card;
        this.owner = owner;
        this.obtened = obtened;
    }

    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Card
    public get Card(): Card {
        return this.card;
    }
    public set Card(card: Card) {
        this.card = card;
    }

    // Owner
    public get Owner(): User {
        return this.owner;
    }
    public set Owner(owner: User) {
        this.owner = owner;
    }

    // Obtened
    public get Obtened(): number {
        return this.obtened;
    }
    public set Obtened(obtened: number) {
        this.obtened = obtened;
    }
}