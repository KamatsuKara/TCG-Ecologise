import { Request, Response } from "express";
import { Card } from "../Models/Card";
import { CardService } from "../Services/CardService";

export class CardController{
    constructor(private cardService:CardService){}

    getAllCard = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cards = await this.cardService.getAllCard();
            res.json(cards);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    getCard = async (req:Request, res:Response):Promise<void> => {
        try{
            const card = await this.cardService.getCard(Number(req.params.id));
            res.json(card);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    createCard = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardService.createCard(req.body);
            res.json("Card created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    deleteCard = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardService.deleteCard(Number(req.params.id));
            res.json("Card deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    updateCard = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardService.updateCard(req.body);
            res.json("Card updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}