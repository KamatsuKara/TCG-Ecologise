import { Request, Response } from "express";
import { CardModel } from "../Models/CardModel";
import { CardModelService } from "../Services/CardModelService";

export class CardModelController{
    constructor(private cardModelService:CardModelService){}

    getAllCardModel = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardModels = await this.cardModelService.getAllCardModel();
            res.json(cardModels);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    getCardModel = async (req:Request, res:Response):Promise<void> => {
        try{
            const cardModel = await this.cardModelService.getCardModel(Number(req.params.id));
            res.json(cardModel);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    createCardModel = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardModelService.createCardModel(req.body);
            res.json("CardModel created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    deleteCardModel = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardModelService.deleteCardModel(Number(req.params.id));
            res.json("CardModel deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    updateCardModel = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardModelService.updateCardModel(req.body);
            res.json("CardModel updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}