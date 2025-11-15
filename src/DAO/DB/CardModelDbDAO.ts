import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardModel } from "../../Models/CardModel";
import { CardModelDAO } from "../CardModelDAO";

export class CardModelDbDAO implements CardModelDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(cardModel:CardModel):Promise<void>{
    const request:string = `INSERT INTO cardModel(name,image,description,effect) VALUES (?,?,?,?)`;
    const pattern:string[] = [
      cardModel.getName(),
      cardModel.getImage(),
      cardModel.getDescription(),
      cardModel.getEffect()
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardModel:CardModel):Promise<void>{
    const request:string = `UPDATE cardModel SET name=?,image=?,description=?,effect=? WHERE id=?`;
    const pattern:string[] = [
      cardModel.getName(),
      cardModel.getImage(),
      cardModel.getDescription(),
      cardModel.getEffect(),
      cardModel.getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(cardModel:CardModel):Promise<void>{
    const request:string = `DELETE FROM cardModel WHERE id = ?`;
    const pattern:string[] = [
      cardModel.getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<CardModel[]>{
    const request:string = `SELECT * FROM cardModel`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<CardModel|undefined>{
    const request:string = `SELECT * FROM cardModel WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    return (await this.db).get(request, pattern);
  }
}