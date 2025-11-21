import { CardModel } from "../Models/CardModel";
import { CardModelDAO } from "../DAO/CardModelDAO";

export class CardModelService {
    constructor(private cardModelDAO: CardModelDAO){}

    async getAllCardModel():Promise<CardModel[]>{
        return await this.cardModelDAO.findAll();
    }

    async getCardModel(id: number):Promise<CardModel>{
        const cardModel = await this.cardModelDAO.findById(id);
        if(!cardModel){
            throw new Error("CardModel not found");
        }
        return cardModel;
    }

    async createCardModel(cardModel:CardModel):Promise<void>{
        
        this.cardModelDAO.insert(cardModel);
    }

    async deleteCardModel(id:number):Promise<void>{
        await this.cardModelDAO.delete(id);
    }

    async updateCardModel(data:CardModel):Promise<void>{
        await this.cardModelDAO.update(data);
    }
}