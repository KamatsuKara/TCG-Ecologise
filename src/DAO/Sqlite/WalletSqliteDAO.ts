import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Wallet } from "../../Models/Wallet";
import { WalletDAO } from "../WalletDAO";
import { User } from "../../Models/User";
import { Currency } from "../../Models/Currency";

export class WalletSqliteDAO implements WalletDAO {
  private db: Promise<Database>;

  constructor(dbFilePath: string) {
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(wallet: Wallet): Promise<void> {
    const request: string = `INSERT INTO wallet(amount, id_user, id_currency) VALUES (?, ?, ?)`;
    const values: string[] = [
      wallet.amount.toString(),
      wallet.user.id.toString(),
      wallet.currency.id.toString()
    ];

    (await this.db).run(request, values);
  }

  async update(wallet: Wallet): Promise<void> {
    const patterns: string[] = [];
    const values: string[] = [];

    if (wallet.amount != null) {
      patterns.push("amount=?");
      values.push(wallet.amount.toString());
    }

    const request: string = `UPDATE wallet SET ${patterns.join(", ")} WHERE id_user=? AND id_currency=?`;
    values.push(wallet.user.id.toString());
    values.push(wallet.currency.id.toString());

    (await this.db).run(request, values);
  }

  async delete(userId: number, currencyId: number): Promise<void> {
    const request: string = `DELETE FROM wallet WHERE id_user = ? AND id_currency = ?`;
    const values: string[] = [
      userId.toString(),
      currencyId.toString()
    ];

    (await this.db).run(request, values);
  }

  async findAll(): Promise<Wallet[]> {
    const request: string = `SELECT * FROM wallet`;
    const rows = await (await this.db).all(request);

    return rows.map(row => new Wallet(
      row.amount,
      new User(row.id_user),
      new Currency(row.id_currency)
    ));
  }

  async findByUser(userId: number): Promise<Wallet[]> {
    const request: string = `SELECT * FROM wallet WHERE id_user = ?`;
    const values: string[] = [userId.toString()];

    const rows = await (await this.db).all(request, values);
    return rows.map(row => new Wallet(
      row.amount,
      new User(row.id_user),
      new Currency(row.id_currency)
    ));
  }

  async findByCurrency(currencyId: number): Promise<Wallet[]> {
    const request: string = `SELECT * FROM wallet WHERE id_currency = ?`;
    const values: string[] = [currencyId.toString()];

    const rows = await (await this.db).all(request, values);
    return rows.map(row => new Wallet(
      row.amount,
      new User(row.id_user),
      new Currency(row.id_currency)
    ));
  }

  async findByUserAndCurrency(userId: number, currencyId: number): Promise<Wallet | undefined> {
    const request: string = `SELECT * FROM wallet WHERE id_user = ? AND id_currency = ?`;
    const values: string[] = [
      userId.toString(),
      currencyId.toString()
    ];

    const row = await (await this.db).get(request, values);
    return row ? new Wallet(
      row.amount,
      new User(row.id_user),
      new Currency(row.id_currency)
    ) : undefined;
  }
}