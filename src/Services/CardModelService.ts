import { CardModel } from "../Models/CardModel";
import { CardModelDAO } from "../DAO/CardModelDAO";

export class CardModelService {
    constructor(private cardModelDAO: CardModelDAO){}

    async getAll(limit:number, page:number):Promise<CardModel[]>{
        var cardModels:CardModel[] = await this.cardModelDAO.findAll();
        cardModels = cardModels.slice((page-1)*limit, page*limit);
        return cardModels;
    }

    async get(id: number):Promise<CardModel>{
        const cardModel = await this.cardModelDAO.findById(id);
        if(!cardModel){
            throw new Error("CardModel not found");
        }
        return cardModel;
    }

    async create(cardModel:CardModel):Promise<void>{
        
        this.cardModelDAO.insert(cardModel);
    }

    async delete(id:number):Promise<void>{
        await this.cardModelDAO.delete(id);
    }

    async update(data:CardModel):Promise<void>{
        await this.cardModelDAO.update(data);
    }
}