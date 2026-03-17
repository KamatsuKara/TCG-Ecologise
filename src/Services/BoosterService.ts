import { Booster } from "../Models/Booster";
import { BoosterDAO } from "../DAO/BoosterDAO";
import { BoosterDropRateDAO } from "../DAO/BoosterDropRateDAO";
import { CardDAO } from "../DAO/CardDAO";
import { BoosterModelDAO } from "../DAO/BoosterModelDAO";
import { Card } from "../Models/Card";
import { User } from "../Models/User";
import { RarityDAO } from "../DAO/RarityDAO";
import { CardModelDAO } from "../DAO/CardModelDAO";

export class BoosterService {
    constructor(
        private boosterDAO: BoosterDAO,
        private boosterDropRateDao: BoosterDropRateDAO,
        private cardDAO: CardDAO,
        private rarityDAO: RarityDAO,
        private cardModelDAO: CardModelDAO,
        private boosterModelDAO: BoosterModelDAO
    ){}

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

    async openBooster(userId: number, boosterId: number): Promise<void> {
        // Fetch the booster and its associated drop rates
        const booster = await this.boosterDAO.findById(boosterId);
        if (!booster) {
            throw new Error("Booster not found");
        }

        const dropRates = await this.boosterDropRateDao.findByBoosterModel(booster.boosterModel.id);
        if (!dropRates || dropRates.length === 0) {
            throw new Error("No drop rates found for this booster model");
        }

        const boosterModel = await this.boosterModelDAO.findById(booster.boosterModel.id);
        if (!boosterModel) {
            throw new Error("Booster Model not found");
        }
        booster.boosterModel = boosterModel;

        // Simulate opening the booster and selecting cards based on drop rates
        const generatedCards = await this.generateCards(dropRates, booster.boosterModel.nmbCard, new User(userId));

        // Add the generated cards to the user's collection
        for (const card of generatedCards) {
            await this.cardDAO.insert({ ...card, userId });
        }
    }

    private async generateCards(dropRates: any[], nmb :number, user: User): Promise<any[]> {
        const generatedCards = [];
        const allCard = await this.cardModelDAO.findAll();
        const allRarity = await this.rarityDAO.findAll();
        for (let i = 0; i < nmb; i++) {
            const randomCardModel = allCard[Math.floor(Math.random() * allCard.length)];
            const randomRarity = allRarity[Math.floor(Math.random() * allRarity.length)];
            generatedCards.push(new Card(
                -1,
                user,
                randomCardModel,
                randomRarity
            ));
        }

        return generatedCards;
    }
}