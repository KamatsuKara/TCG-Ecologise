import { Booster } from "../Models/Booster";

export interface BoosterDAO {
    insert(booster: Booster): Promise<void>;
    update(booster: Booster): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Booster[]>;
    findById(id: number): Promise<Booster | undefined>;
    findByUser(userId: number): Promise<Booster[]>;
}