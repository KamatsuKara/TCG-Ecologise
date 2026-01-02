import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardModel } from "../../Models/CardModel";
import { CardModelDAO } from "../CardModelDAO";

export class CardModelSqliteDAO implements CardModelDAO {
	private db:Promise<Database>;

	constructor(dbFilePath: string){
		this.db = open({
			filename: dbFilePath,
			driver: sqlite3.Database
		});
	}

	async insert(cardModel:CardModel):Promise<void>{
		const patterns: string[] = ["name"];
		const values: string[] = [cardModel.name];

		if(cardModel.image!=null){
			patterns.push("image");
			values.push(cardModel.image);
		}
		if(cardModel.description!=null){
			patterns.push("description");
			values.push(cardModel.description);
		}
		if(cardModel.effect!=null){
			patterns.push("effect");
			values.push(cardModel.effect);
		}

		const request:string = `INSERT INTO cardModel(${patterns.join(",")}) VALUES (${Array(values.length).fill("?").join(",")})`;

		(await this.db).run(request, values);
	}

	async update(cardModel: CardModel): Promise<void> {
		const patterns: string[] = [];
		const values: string[] = [];

		if(cardModel.name != null) {
			patterns.push("name=?");
			values.push(cardModel.name);
		}
		if(cardModel.image != null) {
			patterns.push("image=?");
			values.push(cardModel.image);
		}
		if(cardModel.description != null) {
			patterns.push("description=?");
			values.push(cardModel.description);
		}
		if(cardModel.effect != null) {
			patterns.push("effect=?");
			values.push(cardModel.effect);
		}

		const request: string = `UPDATE cardModel SET ${patterns.join(", ")} WHERE id=?`;
		values.push(cardModel.id.toString());

		(await this.db).run(request, values);
	}


	async delete(id:number):Promise<void>{
		const request:string = `DELETE FROM cardModel WHERE id = ?`;
		const values:string[] = [
		id.toString()
		];

		(await this.db).run(request, values);
	}

	async findAll():Promise<CardModel[]>{
		const request:string = `SELECT * FROM cardModel`;

		return (await this.db).all(request);
	}

	async findById(id:number):Promise<CardModel|undefined>{
		const request:string = `SELECT * FROM cardModel WHERE id = ?`;
		const values:string[] = [
		id.toString()
		];

		return (await this.db).get(request, values);
	}
}