import { User } from "../Models/User";
import { UserDAO } from "../DAO/UserDAO";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export class UserService {
    constructor(private userDAO: UserDAO){}

    async getAll(limit:number, page:number):Promise<User[]>{
        var users:User[] = await this.userDAO.findAll();
        users = users.slice((page-1)*limit, page*limit);
        return users;
    }

    async get(id: number):Promise<User>{
        const user = await this.userDAO.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        user.password = "";
        return user;
    }

    async create(user:User):Promise<void>{
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        user.create = Date.now();
        this.userDAO.insert(user);
    }

    async delete(id:number):Promise<void>{
        await this.userDAO.delete(id);
    }

    async update(data:User):Promise<void>{
        await this.userDAO.update(data);
    }
}