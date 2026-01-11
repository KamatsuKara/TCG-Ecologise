import { Currency } from "../Models/Currency";

export interface CurrencyDAO {
  insert(currency: Currency): Promise<void>;
  update(currency: Currency): Promise<void>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Currency[]>;
  findById(id: number): Promise<Currency | undefined>;
  findByName(name: string): Promise<Currency | undefined>;
}