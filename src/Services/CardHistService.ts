import { CardHist } from "../Models/CardHist";
import { CardHistDAO } from "../DAO/CardHistDAO";

export class CardHistService {
    constructor(private cardHistDAO: CardHistDAO){}

    async getAllCardHist():Promise<CardHist[]>{
        return await this.cardHistDAO.findAll();
    }

    async getCardHist(id: number):Promise<CardHist>{
        const cardHist = await this.cardHistDAO.findById(id);
        if(!cardHist){
            throw new Error("CardHist not found");
        }
        return cardHist;
    }

    async createCardHist(cardHist:CardHist):Promise<void>{
        
        this.cardHistDAO.insert(cardHist);
    }

    async deleteCardHist(id:number):Promise<void>{
        await this.cardHistDAO.delete(id);
    }

    async updateCardHist(data:CardHist):Promise<void>{
        await this.cardHistDAO.update(data);
    }
}