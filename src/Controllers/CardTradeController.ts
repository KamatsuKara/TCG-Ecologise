import { Request, Response } from "express";
import { CardTradeService } from "../Services/CardTradeService";

export class CardTradeController{
    constructor(private cardTradeService:CardTradeService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardTrades = await this.cardTradeService.getAll(limit, page);
            res.json(cardTrades);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const cardTrade = await this.cardTradeService.get(Number(req.params.id));
            res.json(cardTrade);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.cardTradeService.create(req.body);
            res.json("CardTrade created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardTradeService.delete(Number(req.params.id));
            res.json("CardTrade deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.cardTradeService.update(req.body);
            res.json("CardTrade updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}