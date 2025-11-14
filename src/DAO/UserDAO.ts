import { User } from "../Models/User";

export interface UserDAO {
    insert(user:User):Promise<void>;
    update(user:User):Promise<void>;
    delete(user:User):Promise<void>;
    findAll():Promise<User[]>;
    findById(id:number):Promise<User|null>;
}