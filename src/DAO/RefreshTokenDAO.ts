import { RefreshToken } from "../Models/RefreshToken";

export interface RefreshTokenDAO {
    insert(refreshToken:RefreshToken):Promise<void>;
    update(refreshToken:RefreshToken):Promise<void>;
    delete(id:Number):Promise<void>;
    findAll():Promise<RefreshToken[]>;
    findById(id:number):Promise<RefreshToken|undefined>;
    findByToken(token:string):Promise<RefreshToken|undefined>;
    findByUser(IdUser:number):Promise<RefreshToken[]>;
}