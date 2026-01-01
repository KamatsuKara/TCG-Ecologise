import { Request, Response } from "express";
import { AuthService } from "../Services/AuthService";

export class AuthController{
    constructor(private authService:AuthService){}

    async login(req:Request, res:Response):Promise<void>{
        try{
            const email:string = req.body.email?.toString() || "Error";
            const password:string = req.body.password?.toString()  || "Error";
            const token:string = await this.authService.login(email, password);
            res.json({ token });
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }   
    }

    async register(req:Request, res:Response):Promise<void>{
        try{
            this.authService.register(req.body);
            res.json("Register done");
        }catch(error:any){
            res.status(404).json({ error: error.message });
        } 
    }
}
