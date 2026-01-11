import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardMarket } from "../../Models/CardMarket";
import { CardMarketDAO } from "../CardMarketDAO";
import { Card } from "../../Models/Card";
import { Currency } from "../../Models/Currency";

export class CardMarketSqliteDAO implements CardMarketDAO {
  private db: Promise<Database>;

  constructor(dbFilePath: string) {
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(cardMarket: CardMarket): Promise<void> {
    const request: string = `INSERT INTO cardMarket(price, id_card, id_currency) VALUES (?, ?, ?)`;
    const values: string[] = [
      cardMarket.price.toString(),
      cardMarket.card.id.toString(),
      cardMarket.currency.id.toString()
    ];

    (await this.db).run(request, values);
  }

  async update(cardMarket: CardMarket): Promise<void> {
    const patterns: string[] = [];
    const values: string[] = [];

    if (cardMarket.price != null) {
      patterns.push("price=?");
      values.push(cardMarket.price.toString());
    }
    if (cardMarket.currency != null) {
      patterns.push("id_currency=?");
      values.push(cardMarket.currency.id.toString());
    }

    const request: string = `UPDATE cardMarket SET ${patterns.join(", ")} WHERE id_card=?`;
    values.push(cardMarket.card.id.toString());

    (await this.db).run(request, values);
  }

  async delete(cardId: number): Promise<void> {
    const request: string = `DELETE FROM cardMarket WHERE id_card = ?`;
    const values: string[] = [cardId.toString()];

    (await this.db).run(request, values);
  }

  async findAll(): Promise<CardMarket[]> {
    const request: string = `SELECT * FROM cardMarket`;
    const rows = await (await this.db).all(request);

    return rows.map(row => new CardMarket(
      row.price,
      new Card(row.id_card),
      new Currency(row.id_currency)
    ));
  }

  async findByCard(cardId: number): Promise<CardMarket | undefined> {
    const request: string = `SELECT * FROM cardMarket WHERE id_card = ?`;
    const values: string[] = [cardId.toString()];

    const row = await (await this.db).get(request, values);
    return row ? new CardMarket(
      row.price,
      new Card(row.id_card),
      new Currency(row.id_currency)
    ) : undefined;
  }

  async findByCurrency(currencyId: number): Promise<CardMarket[]> {
    const request: string = `SELECT * FROM cardMarket WHERE id_currency = ?`;
    const values: string[] = [currencyId.toString()];

    const rows = await (await this.db).all(request, values);
    return rows.map(row => new CardMarket(
      row.price,
      new Card(row.id_card),
      new Currency(row.id_currency)
    ));
  }
}