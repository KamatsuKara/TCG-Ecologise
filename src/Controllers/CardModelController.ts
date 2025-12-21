import { Request, Response } from "express";
import { CardModelService } from "../Services/CardModelService";

export class CardModelController{
    constructor(private cardModelService:CardModelService){}

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardModels = await this.cardModelService.getAll(limit, page);
            res.json(cardModels);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const cardModel = await this.cardModelService.get(Number(req.params.id));
            res.json(cardModel);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardModelService.create(req.body);
            res.json("CardModel created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardModelService.delete(Number(req.params.id));
            res.json("CardModel deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardModelService.update(req.body);
            res.json("CardModel updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}