import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardTrade } from "../../Models/CardTrade";
import { CardTradeDAO } from "../CardTradeDAO";
import { Trade } from "../../Models/Trade";
import { Card } from "../../Models/Card";
import { User } from "../../Models/User";

export class CardTradeSqliteDAO implements CardTradeDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(cardTrade: CardTrade): Promise<void> {
    const request: string = `INSERT INTO cardTrade(id_trade, id_card, id_owner) VALUES (?, ?, ?)`;
    const pattern: string[] = [
      cardTrade.trade.id.toString(),
      cardTrade.card.id.toString(),
      cardTrade.owner.id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardTrade: CardTrade): Promise<void> {
    console.log("No modification for CardTrade");
    return;
  }

  async delete(tradeId: number, cardId: number): Promise<void> {
    const request: string = `DELETE FROM cardTrade WHERE id_trade = ? AND id_card = ?`;
    const pattern: string[] = [tradeId.toString(), cardId.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll(): Promise<CardTrade[]> {
    const request: string = `SELECT * FROM cardTrade`;
    const rows = await (await this.db).all(request);

    return rows.map(row => new CardTrade(
      new Trade(row.id_trade),
      new Card(row.id_card),
      new User(row.id_owner)
    ));
  }

  async findByTrade(tradeId: number): Promise<CardTrade[]> {
    const request: string = `SELECT * FROM cardTrade WHERE id_trade = ?`;
    const pattern: string[] = [tradeId.toString()];

    const rows = await (await this.db).all(request, pattern);
    return rows.map(row => new CardTrade(
      new Trade(row.id_trade),
      new Card(row.id_card),
      new User(row.id_owner)
    ));
  }

  async findByCard(cardId: number): Promise<CardTrade | undefined> {
    const request: string = `SELECT * FROM cardTrade WHERE id_card = ?`;
    const pattern: string[] = [cardId.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new CardTrade(
      new Trade(row.id_trade),
      new Card(row.id_card),
      new User(row.id_owner)
    ) : undefined;
  }
}