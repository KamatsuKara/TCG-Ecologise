import { Request, Response } from "express";
import { RarityService } from "../Services/RarityService";

export class RarityController{
    constructor(private rarityService:RarityService){}

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const raritys = await this.rarityService.getAll();
            res.json(raritys);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const rarity = await this.rarityService.get(Number(req.params.id));
            res.json(rarity);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.rarityService.create(req.body);
            res.json("Rarity created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.rarityService.delete(Number(req.params.id));
            res.json("Rarity deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.rarityService.update(req.body);
            res.json("Rarity updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}