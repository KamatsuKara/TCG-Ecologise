import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { RefreshToken } from "../../Models/RefreshToken";
import { RefreshTokenDAO } from "../RefreshTokenDAO";
import { User } from "../../Models/User";

export class RefreshTokenSqliteDAO implements RefreshTokenDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(refreshToken:RefreshToken):Promise<void>{
    const patterns: string[] = ["token_hash", "id_user", "expiration_date", "revoked"];
		const values: string[] = [
      refreshToken.tokenHash,
      refreshToken.user.id.toString(),
      refreshToken.expirationDate.toString(),
      refreshToken.revoked.toString()
    ];
    const request:string = `INSERT INTO refreshToken(${patterns.join(",")}) VALUES (${Array(values.length).fill("?").join(",")})`;

		(await this.db).run(request, values);
  }

  async update(refreshToken:RefreshToken):Promise<void>{
    const patterns: string[] = [];
		const values: string[] = [];

    if(refreshToken.tokenHash != null) {
			patterns.push("token_hash=?");
			values.push(refreshToken.tokenHash);
		}
    if(refreshToken.user != null) {
			patterns.push("id_user=?");
			values.push(refreshToken.user.id.toString());
		}
    if(refreshToken.expirationDate != null) {
			patterns.push("expiration_date=?");
			values.push(refreshToken.expirationDate.toString());
		}
    if(refreshToken.revoked != null) {
			patterns.push("revoked=?");
			values.push(refreshToken.revoked.toString());
		}

		const request: string = `UPDATE refreshToken SET ${patterns.join(", ")} WHERE id=?`;
    values.push(refreshToken.id.toString());

		(await this.db).run(request, values);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM refreshToken WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<RefreshToken[]>{
    const request:string = `SELECT * FROM refreshToken`;

    const row = await (await this.db).all(request);
    return row.map(r => new RefreshToken(r.id, r.token_hash, new User(r.id_user), r.expiration_date, r.revoked === 1));
  }

  async findById(id:number):Promise<RefreshToken|undefined>{
    const request:string = `SELECT * FROM refreshToken WHERE id = ?`;
    const pattern:string[] = [
        id.toString()
    ];

    const row = await (await this.db).get(request, pattern);
    return row? new RefreshToken(row.id,row.token_hash,new User(row.id_user), row.expiration_date,row.revoked === 1) : undefined;
  }

  async findByToken(token:string):Promise<RefreshToken|undefined>{
    const request:string = `SELECT * FROM refreshToken WHERE token_hash = ?`;
    const pattern:string[] = [
        token
    ];

    const row = await (await this.db).get(request, pattern);
    return row? new RefreshToken(row.id,row.token_hash,new User(row.id_user), row.expiration_date,row.revoked === 1) : undefined;
  }

  async findByUser(IdUser:number):Promise<RefreshToken[]>{
    const request:string = `SELECT * FROM refreshToken where id_user = ? ORDER BY expiration_date DESC`;
    const pattern:string[] = [
        IdUser.toString()
    ];

    const row = await (await this.db).all(request, pattern);
    return row.map(r => new RefreshToken(r.id, r.token_hash, new User(r.id_user), r.expiration_date, r.revoked === 1));
  }
}