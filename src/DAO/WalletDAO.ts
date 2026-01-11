import { Wallet } from "../Models/Wallet";

export interface WalletDAO {
  insert(wallet: Wallet): Promise<void>;
  update(wallet: Wallet): Promise<void>;
  delete(userId: number, currencyId: number): Promise<void>;
  findAll(): Promise<Wallet[]>;
  findByUser(userId: number): Promise<Wallet[]>;
  findByCurrency(currencyId: number): Promise<Wallet[]>;
  findByUserAndCurrency(userId: number, currencyId: number): Promise<Wallet | undefined>;
}