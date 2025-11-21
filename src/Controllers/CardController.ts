import { Request, Response } from "express";
import { CardService } from "../Services/CardService";

export class CardController{
    constructor(private cardService:CardService){}

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cards = await this.cardService.getAll();
            res.json(cards);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const card = await this.cardService.get(Number(req.params.id));
            res.json(card);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardService.create(req.body);
            res.json("Card created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardService.delete(Number(req.params.id));
            res.json("Card deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardService.update(req.body);
            res.json("Card updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}