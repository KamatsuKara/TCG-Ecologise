import { Request, Response } from "express";
import { BoosterDropRateService } from "../Services/BoosterDropRateService";

export class BoosterDropRateController{
    constructor(private boosterDropRateService:BoosterDropRateService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const boosterDropRates = await this.boosterDropRateService.getAll(limit, page);
            res.json(boosterDropRates);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const boosterDropRate = await this.boosterDropRateService.get(Number(req.params.id));
            res.json(boosterDropRate);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterDropRateService.create(req.body);
            res.json("BoosterDropRate created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterDropRateService.delete(Number(req.params.id));
            res.json("BoosterDropRate deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterDropRateService.update(req.body);
            res.json("BoosterDropRate updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}