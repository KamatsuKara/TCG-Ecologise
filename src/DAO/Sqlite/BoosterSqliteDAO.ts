import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Booster } from "../../Models/Booster";
import { BoosterDAO } from "../BoosterDAO";
import { BoosterModel } from "../../Models/BoosterModel";
import { User } from "../../Models/User";

export class BoosterSqliteDAO implements BoosterDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(booster:Booster):Promise<void>{
    const request: string = `INSERT INTO booster(seed, id_boostermodel, id_user, obtened, created) VALUES (?, ?, ?, ?, ?)`;
    const pattern: string[] = [
      booster.seed.toString(),
      booster.boosterModel.id.toString(),
      booster.user.id.toString(),
      booster.obtened.toString(),
      booster.created.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(booster:Booster):Promise<void>{
    const patterns: string[] = [];
    const values: string[] = [];

    if (booster.seed != null) {
      patterns.push("seed=?");
      values.push(booster.seed.toString());
    }
    if (booster.boosterModel != null) {
      patterns.push("id_boostermodel=?");
      values.push(booster.boosterModel.id.toString());
    }
    if (booster.user != null) {
      patterns.push("id_user=?");
      values.push(booster.user.id.toString());
    }
    if (booster.obtened != null) {
      patterns.push("obtened=?");
      values.push(booster.obtened.toString());
    }
    if (booster.created != null) {
      patterns.push("created=?");
      values.push(booster.created.toString());
    }

    const request: string = `UPDATE booster SET ${patterns.join(", ")} WHERE id=?`;
    values.push(booster.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id:number):Promise<void>{
    const request: string = `DELETE FROM booster WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<Booster[]>{
    const request: string = `SELECT * FROM booster`;
    const rows = await (await this.db).all(request);
    
    return rows.map(row => new Booster(
      row.id,
      row.seed,
      new BoosterModel(row.id_boostermodel),
      new User(row.id_user),
      row.obtened,
      row.created
    ));
  }

  async findById(id:number):Promise<Booster|undefined>{
    const request: string = `SELECT * FROM booster WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new Booster(
      row.id,
      row.seed,
      new BoosterModel(row.id_boostermodel),
      new User(row.id_user),
      row.obtened,
      row.created
    ) : undefined;
  }

  async findByUser(userId: number): Promise<Booster[]> {
    const request: string = `SELECT * FROM booster WHERE id_user = ?`;
    const pattern: string[] = [userId.toString()];

    const rows = await (await this.db).all(request, pattern);
    return rows.map(row => new Booster(
      row.id,
      row.seed,
      new BoosterModel(row.id_boostermodel),
      new User(row.id_user),
      row.obtened,
      row.created
    ));
  }
}