import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { User } from "../../Models/User";
import { UserDAO } from "../UserDAO";

export class UserSqliteDAO implements UserDAO {
	private db:Promise<Database>;

	constructor(dbFilePath: string){
		this.db = open({
			filename: dbFilePath,
			driver: sqlite3.Database
		});
	}

	async insert(user:User):Promise<void>{
		const request:string = `INSERT INTO user(name,email,password,role,creation) VALUES (?,?,?,?,?)`;
		const values:string[] = [
			user.name,
			user.email,
			user.password,
			user.role,
			user.create.toString()
		];

		(await this.db).run(request, values);
	}

	async update(user: User): Promise<void> {
		const patterns: string[] = [];
		const values: string[] = [];

		if(user.name != null) {
			patterns.push("name=?");
			values.push(user.name);
		}
		if(user.email != null) {
			patterns.push("email=?");
			values.push(user.email);
		}
		if(user.password != null) {
			patterns.push("password=?");
			values.push(user.password);
		}
		if(user.role != null) {
			patterns.push("role=?");
			values.push(user.role);
		}
		if(user.create != null) {
			patterns.push("creation=?");
			values.push(user.create.toString());
		}

		const request: string = `UPDATE user SET ${patterns.join(", ")} WHERE id=?`;
		values.push(user.id.toString());

		(await this.db).run(request, values);
	}


	async delete(id:number):Promise<void>{
		const request:string = `DELETE FROM user WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		(await this.db).run(request, values);
	}

	async findAll():Promise<User[]>{
		const request:string = `SELECT * FROM user`;

		return (await this.db).all(request);
	}

	async findById(id:number):Promise<User|undefined>{
		const request:string = `SELECT * FROM user WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		return (await this.db).get(request, values);
	}

	async findByEmail(email:string):Promise<User|undefined>{
		const request:string = `SELECT * FROM user WHERE email = ?`;
		const values:string[] = [
			email
		];

		return (await this.db).get(request, values);
	}
}