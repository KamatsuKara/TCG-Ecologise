import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Currency } from "../../Models/Currency";
import { CurrencyDAO } from "../CurrencyDAO";

export class CurrencySqliteDAO implements CurrencyDAO {
  private db: Promise<Database>;

  constructor(dbFilePath: string) {
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(currency: Currency): Promise<void> {
    const request: string = `INSERT INTO currency(name, ration) VALUES (?, ?)`;
    const values: string[] = [
      currency.name,
      currency.ratio.toString()
    ];

    (await this.db).run(request, values);
  }

  async update(currency: Currency): Promise<void> {
    const patterns: string[] = [];
    const values: string[] = [];

    if (currency.name != null) {
      patterns.push("name=?");
      values.push(currency.name);
    }
    if (currency.ratio != null) {
      patterns.push("ration=?");
      values.push(currency.ratio.toString());
    }

    const request: string = `UPDATE currency SET ${patterns.join(", ")} WHERE id=?`;
    values.push(currency.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id: number): Promise<void> {
    const request: string = `DELETE FROM currency WHERE id = ?`;
    const values: string[] = [id.toString()];

    (await this.db).run(request, values);
  }

  async findAll(): Promise<Currency[]> {
    const request: string = `SELECT * FROM currency`;
    const rows = await (await this.db).all(request);

    return rows.map(row => new Currency(
      row.id,
      row.name,
      row.ration
    ));
  }

  async findById(id: number): Promise<Currency | undefined> {
    const request: string = `SELECT * FROM currency WHERE id = ?`;
    const values: string[] = [id.toString()];

    const row = await (await this.db).get(request, values);
    return row ? new Currency(
      row.id,
      row.name,
      row.ration
    ) : undefined;
  }

  async findByName(name: string): Promise<Currency | undefined> {
    const request: string = `SELECT * FROM currency WHERE name = ?`;
    const values: string[] = [name];

    const row = await (await this.db).get(request, values);
    return row ? new Currency(
      row.id,
      row.name,
      row.ration
    ) : undefined;
  }
}
