import { Trade } from "../Models/Trade";

export interface TradeDAO {
    insert(trade: Trade): Promise<void>;
    update(trade: Trade): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Trade[]>;
    findById(id: number): Promise<Trade | undefined>;
    findByUser(userId: number): Promise<Trade[]>;
}