import { Request, Response } from "express";
import { UserService } from "../Services/UserService";

export class UserController{
    constructor(private userService:UserService){}

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const users = await this.userService.getAll(limit, page);
            res.json(users);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const user = await this.userService.get(Number(req.params.id));
            res.json(user);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.userService.create(req.body);
            res.json("User created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.userService.delete(Number(req.params.id));
            res.json("User deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.userService.update(req.body);
            res.json("User updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}