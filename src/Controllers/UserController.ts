import { Request, Response } from "express";
import { UserService } from "../Services/UserService";

export class UserController{
    constructor(private userService:UserService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const users = await this.userService.getAll(limit, page);
            res.json(users);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const user = await this.userService.get(Number(req.params.id));
            res.json(user);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async getMe(req:Request, res:Response):Promise<void>{
        try{
            const user = await this.userService.get(Number(req.user?.sub));
            res.json(user);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.create(req.body);
            res.json("User created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.delete(Number(req.params.id));
            res.json("User deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.update(req.body);
            res.json("User updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}