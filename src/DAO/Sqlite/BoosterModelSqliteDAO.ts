import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { BoosterModel } from "../../Models/BoosterModel";
import { BoosterModelDAO } from "../BoosterModelDAO";

export class BoosterModelSqliteDAO implements BoosterModelDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(boosterModel:BoosterModel):Promise<void>{
    const request:string = `INSERT INTO boosterModel() VALUES ()`;
    const pattern:string[] = [
        
    ];

    (await this.db).run(request, pattern);
  }

  async update(boosterModel:BoosterModel):Promise<void>{
    const request:string = `UPDATE boosterModel SET  WHERE id=?`;
    const pattern:string[] = [

        boosterModel.id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM boosterModel WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<BoosterModel[]>{
    const request:string = `SELECT * FROM boosterModel`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<BoosterModel|undefined>{
    const request:string = `SELECT * FROM boosterModel WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    return (await this.db).get(request, pattern);
  }
}