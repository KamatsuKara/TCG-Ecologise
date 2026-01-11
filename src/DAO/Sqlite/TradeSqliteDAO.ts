import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Trade } from "../../Models/Trade";
import { TradeDAO } from "../TradeDAO";
import { User } from "../../Models/User";

export class TradeSqliteDAO implements TradeDAO {
  private db: Promise<Database>;

  constructor(dbFilePath: string) {
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(trade: Trade): Promise<void> {
    const patterns: string[] = ["id_sender", "id_receiver", "status", "created"];
    const values: string[] = [
      trade.sender.id.toString(),
      trade.receiver.id.toString(),
      trade.status,
      trade.created.toString(),
    ];

    if (trade.updated != null) {
      patterns.push("updated");
      values.push(trade.updated.toString());
    }

    const request: string = `INSERT INTO trade(${patterns.join(",")}) VALUES (${Array(values.length).fill("?").join(",")})`;

    (await this.db).run(request, values);
  }

  async update(trade: Trade): Promise<void> {
    const patterns: string[] = [];
    const values: string[] = [];

    if (trade.sender != null) {
      patterns.push("id_sender=?");
      values.push(trade.sender.id.toString());
    }
    if (trade.receiver != null) {
      patterns.push("id_receiver=?");
      values.push(trade.receiver.id.toString());
    }
    if (trade.status != null) {
      patterns.push("status=?");
      values.push(trade.status);
    }
    if (trade.created != null) {
      patterns.push("created=?");
      values.push(trade.created.toString());
    }
    if (trade.updated != null) {
      patterns.push("updated=?");
      values.push(trade.updated.toString());
    }

    const request: string = `UPDATE trade SET ${patterns.join(", ")} WHERE id=?`;
    values.push(trade.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id: number): Promise<void> {
    const request: string = `DELETE FROM trade WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll(): Promise<Trade[]> {
    const request: string = `SELECT * FROM trade`;
    const rows = await (await this.db).all(request);

    return rows.map(row => new Trade(
      row.id,
      new User(row.id_sender),
      new User(row.id_receiver),
      row.status,
      row.created,
      row.updated
    ));
  }

  async findById(id: number): Promise<Trade | undefined> {
    const request: string = `SELECT * FROM trade WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new Trade(
      row.id,
      new User(row.id_sender),
      new User(row.id_receiver),
      row.status,
      row.created,
      row.updated
    ) : undefined;
  }

  async findByUser(userId: number): Promise<Trade[]> {
    const request: string = `SELECT * FROM trade WHERE id_sender = ? OR id_receiver = ?`;
    const pattern: string[] = [userId.toString(), userId.toString()];

    const rows = await (await this.db).all(request, pattern);
    return rows.map(row => new Trade(
      row.id,
      new User(row.id_sender),
      new User(row.id_receiver),
      row.status,
      row.created,
      row.updated
    ));
  }
}
