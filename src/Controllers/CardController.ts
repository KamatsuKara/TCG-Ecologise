import { Request, Response } from "express";
import { CardService } from "../Services/CardService";

export class CardController{
    constructor(private cardService:CardService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cards = await this.cardService.getAll(limit, page);
            res.json(cards);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const card = await this.cardService.get(Number(req.params.id));
            res.json(card);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.create(req.body);
            res.json("Card created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.delete(Number(req.params.id));
            res.json("Card deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.update(req.body);
            res.json("Card updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}