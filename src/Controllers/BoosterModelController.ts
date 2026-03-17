import { Request, Response } from "express";
import { BoosterModelService } from "../Services/BoosterModelService";
import { BoosterModel } from "../Models/BoosterModel";

export class BoosterModelController{
    constructor(private boosterModelService:BoosterModelService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const boosterModels = await this.boosterModelService.getAll(limit, page);
            res.json(boosterModels);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const boosterModel = await this.boosterModelService.get(Number(req.params.id));
            res.json(boosterModel);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            const obj = new BoosterModel(
                0,
                req.body.name,
                req.body.nmbCard,
                req.body.category,
            );
            await this.boosterModelService.create(obj);
            res.json("BoosterModel created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterModelService.delete(Number(req.params.id));
            res.json("BoosterModel deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            const obj = new BoosterModel(
                req.body.id,
                req.body.name,
                req.body.nmbCard,
                req.body.category,
            );
            await this.boosterModelService.update(obj);
            res.json("BoosterModel updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async buyBooster(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.user?.sub);
            const boosterModelId = Number(req.params.id);;
            const booster = await this.boosterModelService.buyBooster(userId, boosterModelId);
            res.status(201).json(booster);
        } catch (error: any) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }
}