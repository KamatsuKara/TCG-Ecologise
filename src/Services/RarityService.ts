import { Rarity } from "../Models/Rarity";
import { RarityDAO } from "../DAO/RarityDAO";

export class RarityService {
    constructor(private rarityDAO: RarityDAO){}

    async getAllRarity():Promise<Rarity[]>{
        return await this.rarityDAO.findAll();
    }

    async getRarity(id: number):Promise<Rarity>{
        const rarity = await this.rarityDAO.findById(id);
        if(!rarity){
            throw new Error("Rarity not found");
        }
        return rarity;
    }

    async createRarity(rarity:Rarity):Promise<void>{
        
        this.rarityDAO.insert(rarity);
    }

    async deleteRarity(id:number):Promise<void>{
        await this.rarityDAO.delete(id);
    }

    async updateRarity(data:Rarity):Promise<void>{
        await this.rarityDAO.update(data);
    }
}