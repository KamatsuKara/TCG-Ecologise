import { CardTrade } from "../Models/CardTrade";
import { CardTradeDAO } from "../DAO/CardTradeDAO";

export class CardTradeService {
    constructor(private cardTradeDAO: CardTradeDAO){}

    async getAll(limit:number, page:number):Promise<CardTrade[]>{
        var cardTrades:CardTrade[] = await this.cardTradeDAO.findAll();
        cardTrades = cardTrades.slice((page-1)*limit, page*limit);
        return cardTrades;
    }

    async get(id: number):Promise<CardTrade>{
        const cardTrade = await this.cardTradeDAO.findById(id);
        if(!cardTrade){
            throw new Error("CardTrade not found");
        }
        return cardTrade;
    }

    async create(cardTrade:CardTrade):Promise<void>{
        
        this.cardTradeDAO.insert(cardTrade);
    }

    async delete(id:number):Promise<void>{
        await this.cardTradeDAO.delete(id);
    }

    async update(data:CardTrade):Promise<void>{
        await this.cardTradeDAO.update(data);
    }
}