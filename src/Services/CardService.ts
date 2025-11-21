import { Card } from "../Models/Card";
import { CardDAO } from "../DAO/CardDAO";

export class CardService {
    constructor(private cardDAO: CardDAO){}

    async getAllCard():Promise<Card[]>{
        return await this.cardDAO.findAll();
    }

    async getCard(id: number):Promise<Card>{
        const card = await this.cardDAO.findById(id);
        if(!card){
            throw new Error("Card not found");
        }
        return card;
    }

    async createCard(card:Card):Promise<void>{
        
        this.cardDAO.insert(card);
    }

    async deleteCard(id:number):Promise<void>{
        await this.cardDAO.delete(id);
    }

    async updateCard(data:Card):Promise<void>{
        await this.cardDAO.update(data);
    }
}