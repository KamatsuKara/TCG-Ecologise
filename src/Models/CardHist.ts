export class CardHist {
    private id: number;
    private cardId: number;
    private ownerId: number;
    private create: number;
    private obtened: number;

    constructor(id:number, cardId:number, ownerId:number, create:number, obtened:number){
        this.id = id;
        this.cardId = cardId;
        this.ownerId = ownerId;
        this.create = create;
        this.obtened = obtened;
    }

    public getId():number{
        return this.id;
    }

    public getCardId():number{
        return this.cardId;
    }

    public getOwnerId():number{
        return this.ownerId;
    }

    public getCreate():number{
        return this.create;
    }
    
    public getObtened():number{
        return this.obtened;
    }
}