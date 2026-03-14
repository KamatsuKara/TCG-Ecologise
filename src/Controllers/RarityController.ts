import { Request, Response } from "express";
import { RarityService } from "../Services/RarityService";
import { Rarity } from "../Models/Rarity";

export class RarityController{
    constructor(private rarityService:RarityService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const raritys = await this.rarityService.getAll(limit, page);
            res.json(raritys);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const rarity = await this.rarityService.get(Number(req.params.id));
            res.json(rarity);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            const obj = new Rarity(
                req.body.id,
                req.body.name,
            );
            await this.rarityService.create(obj);
            res.json("Rarity created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.rarityService.delete(Number(req.params.id));
            res.json("Rarity deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            const obj = new Rarity(
                req.body.id,
                req.body.name,
            );
            await this.rarityService.update(obj);
            res.json("Rarity updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}