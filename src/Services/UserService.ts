import { User } from "../Models/User";
import { UserDAO } from "../DAO/UserDAO";

export class UserService {
    constructor(private userDAO: UserDAO){}

    async getAllUser():Promise<User[]>{
        return await this.userDAO.findAll();
    }

    async getUser(id:number):Promise<User>{
        const user = await this.userDAO.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }

    async createUser(user:User):Promise<void>{
        if(!user.getName()){
            throw new Error("Name is required");
        }
        this.userDAO.insert(user);
    }

    async deleteUser(id:number):Promise<void>{
        await this.userDAO.delete(id);
    }

    async updateUser(data:User):Promise<void>{
        await this.userDAO.update(data);
    }
}
