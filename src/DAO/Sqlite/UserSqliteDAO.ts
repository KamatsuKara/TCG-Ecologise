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
    const pattern:string[] = [
      user.Name,
      user.Email,
      user.Password,
      user.Role,
      user.Create.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(user:User):Promise<void>{
    const request:string = `UPDATE user SET name=?,email=?,password=?,role=?,creation=? WHERE id=?`;
    const pattern:string[] = [
      user.Name,
      user.Email,
      user.Password,
      user.Role,
      user.Create.toString(),
      user.Id.toString()
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

  async findByEmail(email:string):Promise<User|undefined>{
    const request:string = `SELECT * FROM user WHERE email = ?`;
    const pattern:string[] = [
      email
    ];

    return (await this.db).get(request, pattern);
  }
}