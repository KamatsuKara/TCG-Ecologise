import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { BoosterDropRate } from "../../Models/BoosterDropRate";
import { BoosterDropRateDAO } from "../BoosterDropRateDAO";
import { BoosterModel } from "../../Models/BoosterModel";
import { Rarity } from "../../Models/Rarity";

export class BoosterDropRateSqliteDAO implements BoosterDropRateDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(boosterDropRate:BoosterDropRate):Promise<void>{
    const request: string = `INSERT INTO boosterDropRate(id_rarity, id_boostermodel, guarantee, drop_rate) VALUES (?, ?, ?, ?)`;
    const pattern: string[] = [
      boosterDropRate.rarity.id.toString(),
      boosterDropRate.boosterModel.id.toString(),
      boosterDropRate.guarantee.toString(),
      boosterDropRate.dropRate.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(boosterDropRate:BoosterDropRate):Promise<void>{
    const patterns: string[] = [];
    const values: string[] = [];

    if (boosterDropRate.rarity != null) {
      patterns.push("id_rarity=?");
      values.push(boosterDropRate.rarity.id.toString());
    }
    if (boosterDropRate.boosterModel != null) {
      patterns.push("id_boostermodel=?");
      values.push(boosterDropRate.boosterModel.id.toString());
    }
    if (boosterDropRate.guarantee != null) {
      patterns.push("guarantee=?");
      values.push(boosterDropRate.guarantee.toString());
    }
    if (boosterDropRate.dropRate != null) {
      patterns.push("drop_rate=?");
      values.push(boosterDropRate.dropRate.toString());
    }

    const request: string = `UPDATE boosterDropRate SET ${patterns.join(", ")} WHERE id=?`;
    values.push(boosterDropRate.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id:number):Promise<void>{
    const request: string = `DELETE FROM boosterDropRate WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<BoosterDropRate[]>{
    const request: string = `SELECT * FROM boosterDropRate`;

    const rows = await (await this.db).all(request);
    return rows.map(row => new BoosterDropRate(
      row.id,
      new Rarity(row.id_rarity),
      new BoosterModel(row.id_boostermodel),
      row.guarantee,
      row.drop_rate
    ));
  }

  async findById(id:number):Promise<BoosterDropRate|undefined>{
    const request: string = `SELECT * FROM boosterDropRate WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new BoosterDropRate(
      row.id,
      new Rarity(row.id_rarity),
      new BoosterModel(row.id_boostermodel),
      row.guarantee,
      row.drop_rate
    ) : undefined;
  }

  async findByBoosterModel(boosterModelId: number): Promise<BoosterDropRate[]> {
    const request: string = `SELECT * FROM boosterDropRate WHERE id_boostermodel = ?`;
    const pattern: string[] = [
      boosterModelId.toString()
    ];

    const rows = await (await this.db).all(request, pattern);
    return rows.map(row => new BoosterDropRate(
      row.id,
      new Rarity(row.id_rarity),
      new BoosterModel(row.id_boostermodel),
      row.guarantee,
      row.drop_rate
    ));
  }
}