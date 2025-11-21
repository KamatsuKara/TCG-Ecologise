import { User } from "../Models/User";
import { UserDAO } from "../DAO/UserDAO";

export class UserService {
    constructor(private userDAO: UserDAO){}

    async getAll():Promise<User[]>{
        return await this.userDAO.findAll();
    }

    async get(id: number):Promise<User>{
        const user = await this.userDAO.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }

    async create(user:User):Promise<void>{
        
        this.userDAO.insert(user);
    }

    async delete(id:number):Promise<void>{
        await this.userDAO.delete(id);
    }

    async update(data:User):Promise<void>{
        await this.userDAO.update(data);
    }
}