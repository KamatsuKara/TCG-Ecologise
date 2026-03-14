import { Request, Response } from "express";
import { CardModelService } from "../Services/CardModelService";
import { CardModel } from "../Models/CardModel";

export class CardModelController{
    constructor(private cardModelService:CardModelService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardModels = await this.cardModelService.getAll(limit, page);
            res.json(cardModels);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const cardModel = await this.cardModelService.get(Number(req.params.id));
            res.json(cardModel);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            const obj = new CardModel(
                req.body.id,
                req.body.name,
                req.body.image,
                req.body.category,
                req.body.description,
                req.body.effect,
            );
            await this.cardModelService.create(obj);
            res.json("CardModel created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardModelService.delete(Number(req.params.id));
            res.json("CardModel deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            const obj = new CardModel(
                req.body.id,
                req.body.name,
                req.body.image,
                req.body.category,
                req.body.description,
                req.body.effect,
            );
            await this.cardModelService.update(obj);
            res.json("CardModel updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}