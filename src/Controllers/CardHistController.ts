import { Request, Response } from "express";
import { CardHistService } from "../Services/CardHistService";

export class CardHistController{
    constructor(private cardHistService:CardHistService){}

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardHists = await this.cardHistService.getAll(limit, page);
            res.json(cardHists);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const cardHist = await this.cardHistService.get(Number(req.params.id));
            res.json(cardHist);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardHistService.create(req.body);
            res.json("CardHist created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardHistService.delete(Number(req.params.id));
            res.json("CardHist deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardHistService.update(req.body);
            res.json("CardHist updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}