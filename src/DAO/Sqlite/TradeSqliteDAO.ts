import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Trade } from "../../Models/Trade";
import { TradeDAO } from "../TradeDAO";

export class TradeSqliteDAO implements TradeDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(trade:Trade):Promise<void>{
    const request:string = `INSERT INTO trade() VALUES ()`;
    const pattern:string[] = [
        
    ];

    (await this.db).run(request, pattern);
  }

  async update(trade:Trade):Promise<void>{
    const request:string = `UPDATE trade SET  WHERE id=?`;
    const pattern:string[] = [

        trade.id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM trade WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<Trade[]>{
    const request:string = `SELECT * FROM trade`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<Trade|undefined>{
    const request:string = `SELECT * FROM trade WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    return (await this.db).get(request, pattern);
  }

  async findByUser(userId: number): Promise<Trade[]> {
    const request:string = `SELECT * FROM trade WHERE id_sender = ? OR id_receiver = ?`;
    const pattern:string[] = [
        userId.toString(),
        userId.toString()
    ];

    return (await this.db).all(request, pattern);
  }
}