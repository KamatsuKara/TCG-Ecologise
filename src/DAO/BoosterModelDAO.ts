import { BoosterModel } from "../Models/BoosterModel";

export interface BoosterModelDAO {
    insert(boosterModel: BoosterModel): Promise<void>;
    update(boosterModel: BoosterModel): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<BoosterModel[]>;
    findById(id: number): Promise<BoosterModel | undefined>;
}