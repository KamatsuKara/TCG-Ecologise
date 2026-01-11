import { BoosterDropRate } from "../Models/BoosterDropRate";

export interface BoosterDropRateDAO {
    insert(boosterDropRate: BoosterDropRate): Promise<void>;
    update(boosterDropRate: BoosterDropRate): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<BoosterDropRate[]>;
    findById(id: number): Promise<BoosterDropRate | undefined>;
    findByBoosterModel(boosterModelId: number): Promise<BoosterDropRate[]>;
}