import { Request, Response } from "express";
import { TradeService } from "../Services/TradeService";
import { Trade } from "../Models/Trade";
import { User } from "../Models/User";

export class TradeController{
    constructor(private tradeService:TradeService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const trades = await this.tradeService.getAll(limit, page);
            res.json(trades);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const trade = await this.tradeService.get(Number(req.params.id));
            res.json(trade);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            const obj = new Trade(
                req.body.id,
                new User(req.body.sender),
                new User(req.body.receiver),
                req.body.status,
                req.body.created,
                req.body.updated,
            );
            await this.tradeService.create(obj);
            res.json("Trade created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.tradeService.delete(Number(req.params.id));
            res.json("Trade deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            const obj = new Trade(
                req.body.id,
                new User(req.body.sender),
                new User(req.body.receiver),
                req.body.status,
                req.body.created,
                req.body.updated,
            );
            await this.tradeService.update(obj);
            res.json("Trade updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}