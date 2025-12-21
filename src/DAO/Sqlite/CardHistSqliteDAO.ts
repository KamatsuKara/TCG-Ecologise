import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardHist } from "../../Models/CardHist";
import { CardHistDAO } from "../CardHistDAO";

export class CardHistSqliteDAO implements CardHistDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(cardHist:CardHist):Promise<void>{
    const request:string = `INSERT INTO cardHist(id_card,id_user,obtened) VALUES (?,?,?)`;
    const pattern:string[] = [
      cardHist.Card.Id.toString(),
      cardHist.Owner.Id.toString(),
      cardHist.Obtened.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardHist:CardHist):Promise<void>{
    const request:string = `UPDATE cardHist SET id_card=?,id_user=?,obtened=? WHERE id = ?`;
    const pattern:string[] = [
      cardHist.Card.Id.toString(),
      cardHist.Owner.Id.toString(),
      cardHist.Obtened.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM cardHist WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<CardHist[]>{
    const request:string = `SELECT * FROM cardHist`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<CardHist|undefined>{
    const request:string = `SELECT * FROM cardHist WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    return (await this.db).get(request, pattern);
  }

  async findByCard(cardId:number):Promise<CardHist[]>{
    const request:string = `SELECT * FROM cardHist WHERE id_card = ?`;
    const pattern:string[] = [
      cardId.toString()
    ];

    return (await this.db).all(request, pattern);
  }

  async findByUser(userId:number):Promise<CardHist[]>{
    const request:string = `SELECT * FROM cardHist WHERE id_user = ?`;
    const pattern:string[] = [
      userId.toString()
    ];

    return (await this.db).all(request, pattern);
  }
}