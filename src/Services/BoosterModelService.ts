import { BoosterModel } from "../Models/BoosterModel";
import { BoosterModelDAO } from "../DAO/BoosterModelDAO";
import { BoosterDAO } from "../DAO/BoosterDAO";
import { WalletDAO } from "../DAO/WalletDAO";
import { Booster } from "../Models/Booster";
import { User } from "../Models/User";

export class BoosterModelService {
    constructor(
        private boosterModelDAO: BoosterModelDAO,
        private boosterDAO: BoosterDAO,
        private walletDAO: WalletDAO,
    ){}

    async getAll(limit:number, page:number):Promise<BoosterModel[]>{
        var boosterModels:BoosterModel[] = await this.boosterModelDAO.findAll();
        boosterModels = boosterModels.slice((page-1)*limit, page*limit);
        return boosterModels;
    }

    async get(id: number):Promise<BoosterModel>{
        const boosterModel = await this.boosterModelDAO.findById(id);
        if(!boosterModel){
            throw new Error("BoosterModel not found");
        }
        return boosterModel;
    }

    async create(boosterModel:BoosterModel):Promise<void>{
        
        this.boosterModelDAO.insert(boosterModel);
    }

    async delete(id:number):Promise<void>{
        await this.boosterModelDAO.delete(id);
    }

    async update(data:BoosterModel):Promise<void>{
        await this.boosterModelDAO.update(data);
    }

    async buyBooster(userId: number, boosterModelId: number):Promise<void>{
        const wallet = await this.walletDAO.findByUserAndCurrency(userId, 0);
        if (!wallet) {
            throw new Error('Wallet not found for user');
        }

        const boosterCost = 100;
        if (wallet.amount < boosterCost) {
            throw new Error('Insufficient funds');
        }

        wallet.amount -= boosterCost;
        await this.walletDAO.update(wallet);

        const boosterModel = await this.boosterModelDAO.findById(boosterModelId);
        if (!boosterModel) {
            throw new Error('Booster model not found');
        }

        await this.boosterDAO.insert(new Booster(
            -1,
            Math.floor(10000000 + Math.random() * 90000000),
            new BoosterModel(boosterModelId),
            new User(userId)
        ));
    }
}