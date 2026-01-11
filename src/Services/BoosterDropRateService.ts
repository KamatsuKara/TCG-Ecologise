import { BoosterDropRate } from "../Models/BoosterDropRate";
import { BoosterDropRateDAO } from "../DAO/BoosterDropRateDAO";

export class BoosterDropRateService {
    constructor(private boosterDropRateDAO: BoosterDropRateDAO){}

    async getAll(limit:number, page:number):Promise<BoosterDropRate[]>{
        var boosterDropRates:BoosterDropRate[] = await this.boosterDropRateDAO.findAll();
        boosterDropRates = boosterDropRates.slice((page-1)*limit, page*limit);
        return boosterDropRates;
    }

    async get(id: number):Promise<BoosterDropRate>{
        const boosterDropRate = await this.boosterDropRateDAO.findById(id);
        if(!boosterDropRate){
            throw new Error("BoosterDropRate not found");
        }
        return boosterDropRate;
    }

    async create(boosterDropRate:BoosterDropRate):Promise<void>{
        
        this.boosterDropRateDAO.insert(boosterDropRate);
    }

    async delete(id:number):Promise<void>{
        await this.boosterDropRateDAO.delete(id);
    }

    async update(data:BoosterDropRate):Promise<void>{
        await this.boosterDropRateDAO.update(data);
    }
}