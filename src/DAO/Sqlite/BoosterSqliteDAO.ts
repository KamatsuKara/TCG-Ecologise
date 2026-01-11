import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Booster } from "../../Models/Booster";
import { BoosterDAO } from "../BoosterDAO";

export class BoosterSqliteDAO implements BoosterDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(booster:Booster):Promise<void>{
    const request:string = `INSERT INTO booster() VALUES ()`;
    const pattern:string[] = [
        
    ];

    (await this.db).run(request, pattern);
  }

  async update(booster:Booster):Promise<void>{
    const request:string = `UPDATE booster SET  WHERE id=?`;
    const pattern:string[] = [

        booster.id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM booster WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<Booster[]>{
    const request:string = `SELECT * FROM booster`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<Booster|undefined>{
    const request:string = `SELECT * FROM booster WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    return (await this.db).get(request, pattern);
  }

  async findByUser(userId: number): Promise<Booster[]> {
    const request:string = `SELECT * FROM booster WHERE id_user = ?`;
    const pattern:string[] = [
        userId.toString()
    ];

    return (await this.db).all(request, pattern);
  }
}