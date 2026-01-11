import { CardMarket } from "../Models/CardMarket";

export interface CardMarketDAO {
  insert(cardMarket: CardMarket): Promise<void>;
  update(cardMarket: CardMarket): Promise<void>;
  delete(cardId: number): Promise<void>;
  findAll(): Promise<CardMarket[]>;
  findByCard(cardId: number): Promise<CardMarket | undefined>;
  findByCurrency(currencyId: number): Promise<CardMarket[]>;
}