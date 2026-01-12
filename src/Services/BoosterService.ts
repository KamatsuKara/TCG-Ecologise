import { Booster } from "../Models/Booster";
import { BoosterDAO } from "../DAO/BoosterDAO";

export class BoosterService {
    constructor(private boosterDAO: BoosterDAO){}

    async getAll(limit:number, page:number):Promise<Booster[]>{
        var boosters:Booster[] = await this.boosterDAO.findAll();
        boosters = boosters.slice((page-1)*limit, page*limit);
        return boosters;
    }

    async get(id: number):Promise<Booster>{
        const booster = await this.boosterDAO.findById(id);
        if(!booster){
            throw new Error("Booster not found");
        }
        return booster;
    }

    async getByUser(idUser: number):Promise<Booster[]>{
        const booster = await this.boosterDAO.findByUser(idUser);
        return booster;
    }

    async create(booster:Booster):Promise<void>{
        
        this.boosterDAO.insert(booster);
    }

    async delete(id:number):Promise<void>{
        await this.boosterDAO.delete(id);
    }

    async update(data:Booster):Promise<void>{
        await this.boosterDAO.update(data);
    }
}