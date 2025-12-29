import { Request, Response } from "express";
import { AuthService } from "../Services/AuthService";

export class AuthController{
    constructor(private authService:AuthService){}

    async login(req:Request, res:Response):Promise<void>{
        try{
            const email:string = req.query.email?.toString() || "Error";
            const password:string = req.query.password?.toString()  || "Error";
            const token:string = await this.authService.login(email, password);
            res.json({ token });
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
        
    }
}
