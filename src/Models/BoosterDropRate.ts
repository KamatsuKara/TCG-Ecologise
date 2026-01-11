import { BoosterModel } from "./BoosterModel";
import { Rarity } from "./Rarity";

export class BoosterDropRate {
    private _id: number;
    private _rarity: Rarity;
    private _boosterModel: BoosterModel;
    private _guarantee: number;
    private _drop_rate: number;

    constructor(id: number, rarity: Rarity, boosterModel: BoosterModel, guarantee: number, drop_rate: number) {
        this._id = id;
        this._rarity = rarity;
        this._boosterModel = boosterModel;
        this._guarantee = guarantee;
        this._drop_rate = drop_rate;
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

    // Drop_rate
    public get drop_rate(): number {
        return this._drop_rate;
    }
    public set drop_rate(drop_rate: number) {
        this._drop_rate = drop_rate;
    }
}