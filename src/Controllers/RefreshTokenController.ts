import { Request, Response } from "express";
import { RefreshTokenService } from "../Services/RefreshTokenService";
import { RefreshToken } from "../Models/RefreshToken";
import { User } from "../Models/User";

export class RefreshTokenController{
    constructor(private refreshTokenService:RefreshTokenService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const refreshTokens = await this.refreshTokenService.getAll(limit, page);
            res.json(refreshTokens);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const refreshToken = await this.refreshTokenService.get(Number(req.params.id));
            res.json(refreshToken);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            const obj = new RefreshToken(
                req.body.id,
                req.body.tokenHash,
                new User(req.body.idUser),
                req.body.expirationDate,
                req.body.revoked,
            );
            await this.refreshTokenService.create(obj);
            res.json("RefreshToken created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.refreshTokenService.delete(Number(req.params.id));
            res.json("RefreshToken deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            const obj = new RefreshToken(
                req.body.id,
                req.body.tokenHash,
                new User(req.body.idUser),
                req.body.expirationDate,
                req.body.revoked,
            );
            await this.refreshTokenService.update(obj);
            res.json("RefreshToken updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}