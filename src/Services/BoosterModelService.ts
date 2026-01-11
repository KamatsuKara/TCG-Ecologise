import { BoosterModel } from "../Models/BoosterModel";
import { BoosterModelDAO } from "../DAO/BoosterModelDAO";

export class BoosterModelService {
    constructor(private boosterModelDAO: BoosterModelDAO){}

    async getAll(limit:number, page:number):Promise<BoosterModel[]>{
        var boosterModels:BoosterModel[] = await this.boosterModelDAO.findAll();
        boosterModels = boosterModels.slice((page-1)*limit, page*limit);
        return boosterModels;
    }

    async get(id: number):Promise<BoosterModel>{
        const boosterModel = await this.boosterModelDAO.findById(id);
        if(!boosterModel){
            throw new Error("BoosterModel not found");
        }
        return boosterModel;
    }

    async create(boosterModel:BoosterModel):Promise<void>{
        
        this.boosterModelDAO.insert(boosterModel);
    }

    async delete(id:number):Promise<void>{
        await this.boosterModelDAO.delete(id);
    }

    async update(data:BoosterModel):Promise<void>{
        await this.boosterModelDAO.update(data);
    }
}