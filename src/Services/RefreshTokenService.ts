import { RefreshToken } from "../Models/RefreshToken";
import { RefreshTokenDAO } from "../DAO/RefreshTokenDAO";

export class RefreshTokenService {
    constructor(private refreshTokenDAO: RefreshTokenDAO){}

    async getAll(limit:number, page:number):Promise<RefreshToken[]>{
        var refreshTokens:RefreshToken[] = await this.refreshTokenDAO.findAll();
        refreshTokens = refreshTokens.slice((page-1)*limit, page*limit);
        return refreshTokens;
    }

    async get(id: number):Promise<RefreshToken>{
        const refreshToken = await this.refreshTokenDAO.findById(id);
        if(!refreshToken){
            throw new Error("RefreshToken not found");
        }
        return refreshToken;
    }

    async create(refreshToken:RefreshToken):Promise<void>{
        refreshToken.expirationDate = Date.now() + (24 * 60 * 60 * 1000);
        this.refreshTokenDAO.insert(refreshToken);
    }

    async delete(id:number):Promise<void>{
        await this.refreshTokenDAO.delete(id);
    }

    async update(data:RefreshToken):Promise<void>{
        await this.refreshTokenDAO.update(data);
    }
}