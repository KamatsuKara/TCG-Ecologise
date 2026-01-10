import { Request, Response } from "express";
import { AuthService } from "../Services/AuthService";

export class AuthController{
    constructor(private authService:AuthService){}

    async login(req:Request, res:Response):Promise<void>{
        try{
            const email:string = req.body.email?.toString() || "Error";
            const password:string = req.body.password?.toString()  || "Error";
            const security:string[] = await this.authService.login(email, password);
            const jwt:string = security[0];
            const refreshToken:string = security[1];
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ jwt });
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }   
    }

    async register(req:Request, res:Response):Promise<void>{
        try{
            this.authService.register(req.body);
            res.json("Register done");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        } 
    }

    async refresh(req:Request, res:Response):Promise<void>{
        try{
            const refreshToken:string = req.cookies.refreshToken;
            const security:string[] = await this.authService.refresh(refreshToken);
            const jwt:string = security[0];
            const newRefreshToken:string = security[1];
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ jwt });
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }   
    }
}
