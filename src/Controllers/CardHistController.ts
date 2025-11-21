import { Request, Response } from "express";
import { CardHist } from "../Models/CardHist";
import { CardHistService } from "../Services/CardHistService";

export class CardHistController{
    constructor(private cardHistService:CardHistService){}

    getAllCardHist = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardHists = await this.cardHistService.getAllCardHist();
            res.json(cardHists);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    getCardHist = async (req:Request, res:Response):Promise<void> => {
        try{
            const cardHist = await this.cardHistService.getCardHist(Number(req.params.id));
            res.json(cardHist);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    createCardHist = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardHistService.createCardHist(req.body);
            res.json("CardHist created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    deleteCardHist = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardHistService.deleteCardHist(Number(req.params.id));
            res.json("CardHist deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    updateCardHist = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardHistService.updateCardHist(req.body);
            res.json("CardHist updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}