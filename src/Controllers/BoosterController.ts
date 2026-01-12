import { Request, Response } from "express";
import { BoosterService } from "../Services/BoosterService";

export class BoosterController{
    constructor(private boosterService:BoosterService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const boosters = await this.boosterService.getAll(limit, page);
            res.json(boosters);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const booster = await this.boosterService.get(Number(req.params.id));
            res.json(booster);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async getByUser(req:Request, res:Response):Promise<void>{
        try{
            const booster = await this.boosterService.getByUser(Number(req.params.id));
            res.json(booster);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterService.create(req.body);
            res.json("Booster created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterService.delete(Number(req.params.id));
            res.json("Booster deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterService.update(req.body);
            res.json("Booster updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}