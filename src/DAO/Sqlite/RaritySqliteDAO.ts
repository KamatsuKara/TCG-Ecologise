import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Rarity } from "../../Models/Rarity";
import { RarityDAO } from "../RarityDAO";

export class RaritySqliteDAO implements RarityDAO {
	private db: Promise<Database>;

	constructor(dbFilePath: string) {
		this.db = open({
			filename: dbFilePath,
			driver: sqlite3.Database
		});
	}

	async insert(rarity: Rarity): Promise<void> {
		const request: string = `INSERT INTO rarity(name) VALUES (?)`;
		const values: string[] = [rarity.name];

		(await this.db).run(request, values);
	}

	async update(rarity: Rarity): Promise<void> {
		const patterns: string[] = [];
		const values: string[] = [];

		if (rarity.name != null) {
			patterns.push("name=?");
			values.push(rarity.name);
		}

		const request: string = `UPDATE rarity SET ${patterns.join(", ")} WHERE id=?`;
		values.push(rarity.id.toString());

		(await this.db).run(request, values);
	}

	async delete(id: number): Promise<void> {
		const request: string = `DELETE FROM rarity WHERE id = ?`;
		const values: string[] = [id.toString()];

		(await this.db).run(request, values);
	}

	async findAll(): Promise<Rarity[]> {
		const request: string = `SELECT * FROM rarity`;
		const rows = await (await this.db).all(request);

		return rows.map(row => new Rarity(row.id, row.name));
	}

	async findById(id: number): Promise<Rarity | undefined> {
		const request: string = `SELECT * FROM rarity WHERE id = ?`;
		const values: string[] = [id.toString()];

		const row = await (await this.db).get(request, values);
		return row ? new Rarity(row.id, row.name) : undefined;
	}
}
