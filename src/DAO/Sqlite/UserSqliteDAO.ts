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
    const request:string = `INSERT INTO user(name,creation) VALUES (?,?)`;
    const pattern:string[] = [
      user.getName(),
      user.getCreate().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(user:User):Promise<void>{
    const request:string = `UPDATE user SET name=?,creation=? WHERE id=?`;
    const pattern:string[] = [
      user.getName(),
      user.getCreate().toString(),
      user.getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM user WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<User[]>{
    const request:string = `SELECT * FROM user`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<User|undefined>{
    const request:string = `SELECT * FROM user WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    return (await this.db).get(request, pattern);
  }
}