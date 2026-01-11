import { CardTrade } from "../Models/CardTrade";

export interface CardTradeDAO {
    insert(tradeItem: CardTrade): Promise<void>;
    update(tradeItem: CardTrade): Promise<void>;
    delete(tradeId: number, cardId: number): Promise<void>;
    findAll(): Promise<CardTrade[]>;
    findByTrade(tradeId: number): Promise<CardTrade[]>;
    findByCard(cardId: number): Promise<CardTrade | undefined>;
}