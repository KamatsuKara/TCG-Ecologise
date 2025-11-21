import { Card } from "../Models/Card";
import { CardDAO } from "../DAO/CardDAO";

export class CardService {
    constructor(private cardDAO: CardDAO){}

    async getAll():Promise<Card[]>{
        return await this.cardDAO.findAll();
    }

    async get(id: number):Promise<Card>{
        const card = await this.cardDAO.findById(id);
        if(!card){
            throw new Error("Card not found");
        }
        return card;
    }

    async create(card:Card):Promise<void>{
        
        this.cardDAO.insert(card);
    }

    async delete(id:number):Promise<void>{
        await this.cardDAO.delete(id);
    }

    async update(data:Card):Promise<void>{
        await this.cardDAO.update(data);
    }
}