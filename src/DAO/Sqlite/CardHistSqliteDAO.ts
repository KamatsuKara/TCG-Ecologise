import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardHist } from "../../Models/CardHist";
import { CardHistDAO } from "../CardHistDAO";

export class CardHistSqliteDAO implements CardHistDAO {
private db:Promise<Database>;

	constructor(dbFilePath: string){
		this.db = open({
			filename: dbFilePath,
			driver: sqlite3.Database
		});
	}

	async insert(cardHist:CardHist):Promise<void>{
		const request:string = `INSERT INTO cardHist(id_card,id_user,obtened) VALUES (?,?,?)`;
		const values:string[] = [
			cardHist.card.id.toString(),
			cardHist.owner.id.toString(),
			cardHist.obtened.toString()
		];

		(await this.db).run(request, values);
	}

	async update(cardHist:CardHist):Promise<void>{
		const patterns:string[] = [];
		const values:string[] = [];

		if(cardHist.card!=null){
			patterns.push("id_card=?");
			values.push(cardHist.card.id.toString());
		}
		if(cardHist.owner!=null){
			patterns.push("id_user=?");
			values.push(cardHist.owner.id.toString());
		}
		if(cardHist.obtened!=null){
			patterns.push("obtened=?");
			values.push(cardHist.obtened.toString());
		}
		
		const request:string = `UPDATE cardHist SET ${patterns.join(", ")} WHERE id = ?`;
		values.push(cardHist.id.toString());

		(await this.db).run(request, values);
	}

	async delete(id:number):Promise<void>{
		const request:string = `DELETE FROM cardHist WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		(await this.db).run(request, values);
	}

	async findAll():Promise<CardHist[]>{
		const request:string = `SELECT * FROM cardHist`;

		return (await this.db).all(request);
	}

	async findById(id:number):Promise<CardHist|undefined>{
		const request:string = `SELECT * FROM cardHist WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		return (await this.db).get(request, values);
	}

	async findByCard(cardId:number):Promise<CardHist[]>{
		const request:string = `SELECT * FROM cardHist WHERE id_card = ?`;
		const values:string[] = [
			cardId.toString()
		];

		return (await this.db).all(request, values);
	}

	async findByUser(userId:number):Promise<CardHist[]>{
		const request:string = `SELECT * FROM cardHist WHERE id_user = ?`;
		const values:string[] = [
			userId.toString()
		];

		return (await this.db).all(request, values);
	}
}