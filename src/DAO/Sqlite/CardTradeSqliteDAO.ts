import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardTrade } from "../../Models/CardTrade";
import { CardTradeDAO } from "../CardTradeDAO";

export class CardTradeSqliteDAO implements CardTradeDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(cardTrade:CardTrade):Promise<void>{
    const request:string = `INSERT INTO cardTrade() VALUES ()`;
    const pattern:string[] = [
        
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardTrade:CardTrade):Promise<void>{
    const request:string = `UPDATE cardTrade SET  WHERE id=?`;
    const pattern:string[] = [

        cardTrade.id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM cardTrade WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<CardTrade[]>{
    const request:string = `SELECT * FROM cardTrade`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<CardTrade|undefined>{
    const request:string = `SELECT * FROM cardTrade WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    return (await this.db).get(request, pattern);
  }

  async findByCard(cardId: number): Promise<CardTrade | undefined> {
    const request:string = `SELECT * FROM cardTrade WHERE id_card = ?`;
    const pattern:string[] = [
        cardId.toString()
    ];

    return (await this.db).get(request, pattern);
  }

  async findByTrade(tradeId: number): Promise<CardTrade[]> {
    const request:string = `SELECT * FROM cardTrade WHERE id_trade = ?`;
    const pattern:string[] = [
        tradeId.toString()
    ];

    return (await this.db).all(request, pattern);
  }
}