import { Request, Response } from "express";
import { User } from "../Models/User";
import { UserService } from "../Services/UserService";

export class UserController{
    constructor(private userService:UserService){}

    getAllUser = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const users = await this.userService.getAllUser();
            res.json(users);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    getUser = async (req:Request, res:Response):Promise<void> => {
        try{
            const user = await this.userService.getUser(Number(req.params.id));
            res.json(user);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    createUser = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.userService.createUser(req.body);
            res.json("User created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    deleteUser = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.userService.deleteUser(Number(req.params.id));
            res.json("User deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    updateUser = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.userService.updateUser(req.body);
            res.json("User updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}
