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
    const patterns: string[] = ["name", "nmbCard", "category"];
    const values: string[] = [
      boosterModel.name,
      boosterModel.nmbCard.toString(),
      boosterModel.category
    ];

    const request: string = `INSERT INTO boosterModel(${patterns.join(",")}) VALUES (${Array(values.length).fill("?").join(",")})`;

    (await this.db).run(request, values);
  }

  async update(boosterModel:BoosterModel):Promise<void>{
    const patterns: string[] = [];
    const values: string[] = [];

    if (boosterModel.name != null) {
      patterns.push("name=?");
      values.push(boosterModel.name);
    }
    if (boosterModel.nmbCard != null) {
      patterns.push("nmbCard=?");
      values.push(boosterModel.nmbCard.toString());
    }
    if (boosterModel.category != null) {
      patterns.push("category=?");
      values.push(boosterModel.category);
    }

    const request: string = `UPDATE boosterModel SET ${patterns.join(", ")} WHERE id=?`;
    values.push(boosterModel.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id:number):Promise<void>{
    const request: string = `DELETE FROM boosterModel WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<BoosterModel[]>{
    const request: string = `SELECT * FROM boosterModel`;
    const rows = await (await this.db).all(request);
    
    return rows.map(row => new BoosterModel(
      row.id,
      row.name,
      row.nmbCard,
      row.category
    ));
  }

  async findById(id:number):Promise<BoosterModel|undefined>{
    const request: string = `SELECT * FROM boosterModel WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new BoosterModel(
      row.id,
      row.name,
      row.nmbCard,
      row.category
    ):undefined;
  }
}