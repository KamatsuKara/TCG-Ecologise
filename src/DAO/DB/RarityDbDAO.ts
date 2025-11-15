import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Rarity } from "../../Models/Rarity";
import { RarityDAO } from "../RarityDAO";

export class RarityDbDAO implements RarityDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(rarity:Rarity):Promise<void>{
    const request:string = `INSERT INTO rarity(name) VALUES (?)`;
    const pattern:string[] = [
      rarity.getName()
    ];

    (await this.db).run(request, pattern);
  }

  async update(rarity:Rarity):Promise<void>{
    const request:string = `UPDATE rarity SET name=? WHERE id=?`;
    const pattern:string[] = [
      rarity.getName(),
      rarity.getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(rarity:Rarity):Promise<void>{
    const request:string = `DELETE FROM rarity WHERE id = ?`;
    const pattern:string[] = [
      rarity.getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<Rarity[]>{
    const request:string = `SELECT * FROM rarity`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<Rarity|undefined>{
    const request:string = `SELECT * FROM rarity WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    return (await this.db).get(request, pattern);
  }
}