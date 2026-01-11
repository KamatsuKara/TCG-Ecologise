import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { BoosterDropRate } from "../../Models/BoosterDropRate";
import { BoosterDropRateDAO } from "../BoosterDropRateDAO";

export class BoosterDropRateSqliteDAO implements BoosterDropRateDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(boosterDropRate:BoosterDropRate):Promise<void>{
    const request:string = `INSERT INTO boosterDropRate() VALUES ()`;
    const pattern:string[] = [
        
    ];

    (await this.db).run(request, pattern);
  }

  async update(boosterDropRate:BoosterDropRate):Promise<void>{
    const request:string = `UPDATE boosterDropRate SET  WHERE id=?`;
    const pattern:string[] = [

        boosterDropRate.id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM boosterDropRate WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<BoosterDropRate[]>{
    const request:string = `SELECT * FROM boosterDropRate`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<BoosterDropRate|undefined>{
    const request:string = `SELECT * FROM boosterDropRate WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    return (await this.db).get(request, pattern);
  }

  async findByBoosterModel(boosterModelId: number): Promise<BoosterDropRate[]> {
    const request:string = `SELECT * FROM boosterDropRate WHERE boosterModel = ?`;
    const pattern:string[] = [
        boosterModelId.toString()
    ];

    return (await this.db).all(request, pattern);
  }
}