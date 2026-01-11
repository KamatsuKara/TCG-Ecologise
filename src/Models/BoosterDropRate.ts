import { BoosterModel } from "./BoosterModel";
import { Rarity } from "./Rarity";

export class BoosterDropRate {
    private _id: number;
    private _rarity: Rarity;
    private _boosterModel: BoosterModel;
    private _guarantee: number;
    private _dropRate: number;

    constructor(id: number = 0, rarity: Rarity = new Rarity(), boosterModel: BoosterModel = new BoosterModel(), guarantee: number = 0, dropRate: number = 0.2) {
        this._id = id;
        this._rarity = rarity;
        this._boosterModel = boosterModel;
        this._guarantee = guarantee;
        this._dropRate = dropRate;
    }
    
    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Rarity
    public get rarity(): Rarity {
        return this._rarity;
    }
    public set rarity(rarity: Rarity) {
        this._rarity = rarity;
    }

    // BoosterModel
    public get boosterModel(): BoosterModel {
        return this._boosterModel;
    }
    public set boosterModel(boosterModel: BoosterModel) {
        this._boosterModel = boosterModel;
    }

    // Guarantee
    public get guarantee(): number {
        return this._guarantee;
    }
    public set guarantee(guarantee: number) {
        this._guarantee = guarantee;
    }

    // DropRate
    public get dropRate(): number {
        return this._dropRate;
    }
    public set dropRate(dropRate: number) {
        this._dropRate = dropRate;
    }
}