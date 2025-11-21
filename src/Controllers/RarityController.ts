import { Request, Response } from "express";
import { Rarity } from "../Models/Rarity";
import { RarityService } from "../Services/RarityService";

export class RarityController{
    constructor(private rarityService:RarityService){}

    getAllRarity = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const raritys = await this.rarityService.getAllRarity();
            res.json(raritys);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    getRarity = async (req:Request, res:Response):Promise<void> => {
        try{
            const rarity = await this.rarityService.getRarity(Number(req.params.id));
            res.json(rarity);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    createRarity = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.rarityService.createRarity(req.body);
            res.json("Rarity created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    deleteRarity = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.rarityService.deleteRarity(Number(req.params.id));
            res.json("Rarity deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    updateRarity = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.rarityService.updateRarity(req.body);
            res.json("Rarity updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}