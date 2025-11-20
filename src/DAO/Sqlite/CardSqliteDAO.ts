import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Card } from "../../Models/Card";
import { CardDAO } from "../CardDAO";

export class CardSqliteDAO implements CardDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(card:Card):Promise<void>{
    const request:string = `INSERT INTO card(id_user,id_cardmodel,id_rarity,obtened,created) VALUES (?,?,?,?,?)`;
    const pattern:string[] = [
        card.getOwner().getId().toString(),
        card.getCardModel().getId().toString(),
        card.getRarity().getId().toString(),
        card.getObtened().toString(),
        card.getCreated().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(card:Card):Promise<void>{
    const request:string = `UPDATE card SET id_user=?,id_cardmodel=?,id_rarity=?,obtened=?,created=? WHERE id=?`;
    const pattern:string[] = [
        card.getOwner().getId().toString(),
        card.getCardModel().getId().toString(),
        card.getRarity().getId().toString(),
        card.getObtened().toString(),
        card.getCreated().toString(),
        card.getId().toString(),
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM card WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<Card[]>{
    const request:string = `SELECT * FROM card`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<Card|undefined>{
    const request:string = `SELECT * FROM card WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    return (await this.db).get(request, pattern);
  }

  async findByUser(userId:number):Promise<Card[]>{
    const request:string = `SELECT * FROM card WHERE id_user = ?`;
    const pattern:string[] = [
        userId.toString()
    ];

    return (await this.db).all(request, pattern);
  }

  async findByCardModel(cardId:number):Promise<Card[]>{
    const request:string = `SELECT * FROM card WHERE id_card = ?`;
    const pattern:string[] = [
        cardId.toString()
    ];

    return (await this.db).all(request, pattern);
  }

  async findByRarity(rarityId:number):Promise<Card[]>{
    const request:string = `SELECT * FROM card WHERE id_rarity = ?`;
    const pattern:string[] = [
        rarityId.toString()
    ];

    return (await this.db).all(request, pattern);
  }
}