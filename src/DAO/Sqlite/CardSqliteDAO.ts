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
		const values:string[] = [
			card.owner.id.toString(),
			card.cardModel.id.toString(),
			card.rarity.id.toString(),
			card.obtened.toString(),
			card.created.toString()
		];

		(await this.db).run(request, values);
	}

	async update(card: Card): Promise<void> {
		const patterns: string[] = [];
		const values: string[] = [];

		if(card.owner != null) {
			patterns.push("id_user=?");
			values.push(card.owner.id.toString());
		}
		if(card.cardModel != null) {
			patterns.push("id_cardmodel=?");
			values.push(card.cardModel.id.toString());
		}
		if(card.rarity != null) {
			patterns.push("id_rarity=?");
			values.push(card.rarity.id.toString());
		}
		if(card.obtened != null) {
			patterns.push("obtened=?");
			values.push(card.obtened.toString());
		}
		if(card.created != null) {
			patterns.push("created=?");
			values.push(card.created.toString());
		}

		const request: string = `UPDATE card SET ${patterns.join(", ")} WHERE id=?`;
		values.push(card.id.toString());

		(await this.db).run(request, values);
	}


	async delete(id:number):Promise<void>{
		const request:string = `DELETE FROM card WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		(await this.db).run(request, values);
	}

	async findAll():Promise<Card[]>{
		const request:string = `SELECT * FROM card`;

		return (await this.db).all(request);
	}

	async findById(id:number):Promise<Card|undefined>{
		const request:string = `SELECT * FROM card WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		return (await this.db).get(request, values);
	}

	async findByUser(userId:number):Promise<Card[]>{
		const request:string = `SELECT * FROM card WHERE id_user = ?`;
		const values:string[] = [
			userId.toString()
		];

		return (await this.db).all(request, values);
	}

	async findByCardModel(cardId:number):Promise<Card[]>{
		const request:string = `SELECT * FROM card WHERE id_card = ?`;
		const values:string[] = [
			cardId.toString()
		];

		return (await this.db).all(request, values);
	}

	async findByRarity(rarityId:number):Promise<Card[]>{
		const request:string = `SELECT * FROM card WHERE id_rarity = ?`;
		const values:string[] = [
			rarityId.toString()
		];

		return (await this.db).all(request, values);
	}
}