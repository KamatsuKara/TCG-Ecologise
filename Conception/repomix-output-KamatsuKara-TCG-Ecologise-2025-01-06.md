This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.
The content has been processed where security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/**, Tools/SQL/Init.sql, jest_config.ts, package.json
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  Controllers/
    AuthController.ts
    CardController.ts
    CardHistController.ts
    CardModelController.ts
    RarityController.ts
    UserController.ts
  DAO/
    Sqlite/
      CardHistSqliteDAO.ts
      CardModelSqliteDAO.ts
      CardSqliteDAO.ts
      FactorySqliteDAO.ts
      RaritySqliteDAO.ts
      UserSqliteDAO.ts
    CardDAO.ts
    CardHistDAO.ts
    CardModelDAO.ts
    FactoryDAO.ts
    RarityDAO.ts
    UserDAO.ts
  Models/
    Card.ts
    CardHist.ts
    CardModel.ts
    Rarity.ts
    User.ts
  Routes/
    AuthRoutes.ts
    CardHistRoutes.ts
    CardModelRoutes.ts
    CardRoutes.ts
    RarityRoutes.ts
    UserRoutes.ts
  Services/
    AuthService.ts
    CardHistService.ts
    CardModelService.ts
    CardService.ts
    RarityService.ts
    UserService.ts
  authMiddleware.ts
  index.ts
Tools/
  SQL/
    Init.sql
jest_config.ts
package.json
```

# Files

## File: src/Controllers/AuthController.ts
```typescript
import { Request, Response } from "express";
import { AuthService } from "../Services/AuthService";

export class AuthController{
    constructor(private authService:AuthService){}

    async login(req:Request, res:Response):Promise<void>{
        try{
            const email:string = req.body.email?.toString() || "Error";
            const password:string = req.body.password?.toString()  || "Error";
            const token:string = await this.authService.login(email, password);
            res.json({ token });
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }   
    }

    async register(req:Request, res:Response):Promise<void>{
        try{
            this.authService.register(req.body);
            res.json("Register done");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        } 
    }
}
```

## File: src/Controllers/CardController.ts
```typescript
import { Request, Response } from "express";
import { CardService } from "../Services/CardService";

export class CardController{
    constructor(private cardService:CardService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cards = await this.cardService.getAll(limit, page);
            res.json(cards);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const card = await this.cardService.get(Number(req.params.id));
            res.json(card);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async getByUser(req:Request, res:Response):Promise<void>{
        try{
            const card = await this.cardService.getByUser(Number(req.params.id));
            res.json(card);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async getByMe(req:Request, res:Response):Promise<void>{
        try{
            const card = await this.cardService.getByUser(Number(req.user?.sub));
            res.json(card);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.create(req.body);
            res.json("Card created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.delete(Number(req.params.id));
            res.json("Card deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.update(req.body);
            res.json("Card updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}
```

## File: src/Controllers/CardHistController.ts
```typescript
import { Request, Response } from "express";
import { CardHistService } from "../Services/CardHistService";

export class CardHistController{
    constructor(private cardHistService:CardHistService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardHists = await this.cardHistService.getAll(limit, page);
            res.json(cardHists);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const cardHist = await this.cardHistService.get(Number(req.params.id));
            res.json(cardHist);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.cardHistService.create(req.body);
            res.json("CardHist created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardHistService.delete(Number(req.params.id));
            res.json("CardHist deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.cardHistService.update(req.body);
            res.json("CardHist updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}
```

## File: src/Controllers/CardModelController.ts
```typescript
import { Request, Response } from "express";
import { CardModelService } from "../Services/CardModelService";

export class CardModelController{
    constructor(private cardModelService:CardModelService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardModels = await this.cardModelService.getAll(limit, page);
            res.json(cardModels);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const cardModel = await this.cardModelService.get(Number(req.params.id));
            res.json(cardModel);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.cardModelService.create(req.body);
            res.json("CardModel created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardModelService.delete(Number(req.params.id));
            res.json("CardModel deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.cardModelService.update(req.body);
            res.json("CardModel updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}
```

## File: src/Controllers/RarityController.ts
```typescript
import { Request, Response } from "express";
import { RarityService } from "../Services/RarityService";

export class RarityController{
    constructor(private rarityService:RarityService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const raritys = await this.rarityService.getAll(limit, page);
            res.json(raritys);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const rarity = await this.rarityService.get(Number(req.params.id));
            res.json(rarity);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.rarityService.create(req.body);
            res.json("Rarity created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.rarityService.delete(Number(req.params.id));
            res.json("Rarity deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.rarityService.update(req.body);
            res.json("Rarity updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}
```

## File: src/Controllers/UserController.ts
```typescript
import { Request, Response } from "express";
import { UserService } from "../Services/UserService";

export class UserController{
    constructor(private userService:UserService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const users = await this.userService.getAll(limit, page);
            res.json(users);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const user = await this.userService.get(Number(req.params.id));
            res.json(user);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async getMe(req:Request, res:Response):Promise<void>{
        try{
            const user = await this.userService.get(Number(req.user?.sub));
            res.json(user);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.create(req.body);
            res.json("User created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.delete(Number(req.params.id));
            res.json("User deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.update(req.body);
            res.json("User updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async updateMe(req:Request, res:Response):Promise<void>{
        try{
            req.body.id = req.user?.sub;
            await this.userService.update(req.body);
            res.json("User updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}
```

## File: src/DAO/Sqlite/CardHistSqliteDAO.ts
```typescript
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
```

## File: src/DAO/Sqlite/CardModelSqliteDAO.ts
```typescript
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
```

## File: src/DAO/Sqlite/CardSqliteDAO.ts
```typescript
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
```

## File: src/DAO/Sqlite/FactorySqliteDAO.ts
```typescript
import { CardHistSqliteDAO } from "./CardHistSqliteDAO";
import { CardModelSqliteDAO } from "./CardModelSqliteDAO";
import { CardSqliteDAO } from "./CardSqliteDAO";
import { RaritySqliteDAO } from "./RaritySqliteDAO";
import { UserSqliteDAO } from "./UserSqliteDAO";

import { FactoryDAO } from "../FactoryDAO";

import { CardHistDAO } from "../CardHistDAO";
import { CardModelDAO } from "../CardModelDAO";
import { CardDAO } from "../CardDAO";
import { RarityDAO } from "../RarityDAO";
import { UserDAO } from "../UserDAO";

export class FactorySqliteDAO extends FactoryDAO{
    private path:string;

    constructor(_path:string){
        super();
        this.path = _path;
    }

    createCardHistDAO():CardHistDAO{
        return new CardHistSqliteDAO(this.path);
    }

    createCardModelDAO():CardModelDAO{
        return new CardModelSqliteDAO(this.path);
    }

    createCardDAO():CardDAO{
        return new CardSqliteDAO(this.path);
    }

    createRarityDAO():RarityDAO{
        return new RaritySqliteDAO(this.path);
    }

    createUserDAO():UserDAO{
        return new UserSqliteDAO(this.path);
    }
}
```

## File: src/DAO/Sqlite/RaritySqliteDAO.ts
```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Rarity } from "../../Models/Rarity";
import { RarityDAO } from "../RarityDAO";

export class RaritySqliteDAO implements RarityDAO {
	private db:Promise<Database>;

	constructor(dbFilePath: string){
		this.db = open({
			filename: dbFilePath,
			driver: sqlite3.Database
		});
	}

	async insert(rarity:Rarity):Promise<void>{
		const request:string = `INSERT INTO rarity(name) VALUES (?)`;
		const values:string[] = [
			rarity.name
		];

		(await this.db).run(request, values);
	}

	async update(rarity: Rarity): Promise<void> {
		const patterns: string[] = [];
		const values: string[] = [];

		if(rarity.name != null) {
			patterns.push("name=?");
			values.push(rarity.name);
		}

		const request: string = `UPDATE rarity SET ${patterns.join(", ")} WHERE id=?`;
		values.push(rarity.id.toString());

		(await this.db).run(request, values);
	}


	async delete(id:number):Promise<void>{
		const request:string = `DELETE FROM rarity WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		(await this.db).run(request, values);
	}

	async findAll():Promise<Rarity[]>{
		const request:string = `SELECT * FROM rarity`;

		return (await this.db).all(request);
	}

	async findById(id:number):Promise<Rarity|undefined>{
		const request:string = `SELECT * FROM rarity WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		return (await this.db).get(request, values);
	}
}
```

## File: src/DAO/Sqlite/UserSqliteDAO.ts
```typescript
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
```

## File: src/DAO/CardDAO.ts
```typescript
import { Card } from "../Models/Card";

export interface CardDAO {
    insert(card:Card):Promise<void>;
    update(card:Card):Promise<void>;
    delete(id:number):Promise<void>;
    findAll():Promise<Card[]>;
    findById(id:number):Promise<Card|undefined>;
    findByUser(userId:number):Promise<Card[]>;
    findByCardModel(cardModelId:number):Promise<Card[]>;
    findByRarity(rarityId:number):Promise<Card[]>;
}
```

## File: src/DAO/CardHistDAO.ts
```typescript
import { CardHist } from "../Models/CardHist";

export interface CardHistDAO {
    insert(cardHist:CardHist):Promise<void>;
    update(cardHist:CardHist):Promise<void>;
    delete(id:number):Promise<void>;
    findAll():Promise<CardHist[]>;
    findById(id:number):Promise<CardHist|undefined>;
    findByCard(cardId:number):Promise<CardHist[]>;
    findByUser(userId:number):Promise<CardHist[]>;
}
```

## File: src/DAO/CardModelDAO.ts
```typescript
import { CardModel } from "../Models/CardModel";

export interface CardModelDAO {
    insert(cardModel:CardModel):Promise<void>;
    update(cardModel:CardModel):Promise<void>;
    delete(id:number):Promise<void>;
    findAll():Promise<CardModel[]>;
    findById(id:number):Promise<CardModel|undefined>;
}
```

## File: src/DAO/FactoryDAO.ts
```typescript
import { CardDAO } from "./CardDAO";
import { CardHistDAO } from "./CardHistDAO";
import { CardModelDAO } from "./CardModelDAO";
import { RarityDAO } from "./RarityDAO";
import { UserDAO } from "./UserDAO";

export abstract class FactoryDAO{
    abstract createCardDAO():CardDAO;
    abstract createCardHistDAO():CardHistDAO;
    abstract createCardModelDAO():CardModelDAO;
    abstract createRarityDAO():RarityDAO;
    abstract createUserDAO():UserDAO;
}
```

## File: src/DAO/RarityDAO.ts
```typescript
import { Rarity } from "../Models/Rarity";

export interface RarityDAO {
    insert(rarity:Rarity):Promise<void>;
    update(rarity:Rarity):Promise<void>;
    delete(id:number):Promise<void>;
    findAll():Promise<Rarity[]>;
    findById(id:number):Promise<Rarity|undefined>;
}
```

## File: src/DAO/UserDAO.ts
```typescript
import { User } from "../Models/User";

export interface UserDAO {
    insert(user:User):Promise<void>;
    update(user:User):Promise<void>;
    delete(id:number):Promise<void>;
    findAll():Promise<User[]>;
    findById(id:number):Promise<User|undefined>;
    findByEmail(email:string):Promise<User|undefined>;
}
```

## File: src/Models/Card.ts
```typescript
import { User } from "./User";
import { CardModel } from "./CardModel";
import { Rarity } from "./Rarity";

export class Card {
    private _id: number;
    private _owner: User;
    private _cardModel: CardModel;
    private _rarity: Rarity;
    private _created: number;
    private _obtened: number;

    constructor(id:number = 0, owner:User = new User(), cardModel:CardModel = new CardModel(), rarity:Rarity = new Rarity(), created:number = Date.now(), obtened:number = Date.now()){
        this._id = id;
        this._owner = owner;
        this._cardModel = cardModel;
        this._rarity = rarity;
        this._created = created;
        this._obtened = obtened;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Owner
    public get owner(): User {
        return this._owner;
    }
    public set owner(owner: User) {
        this._owner = owner;
    }

    // CardModel
    public get cardModel(): CardModel {
        return this._cardModel;
    }
    public set cardModel(cardModel: CardModel) {
        this._cardModel = cardModel;
    }

    // Rarity
    public get rarity(): Rarity {
        return this._rarity;
    }
    public set rarity(rarity: Rarity) {
        this._rarity = rarity;
    }

    // Created
    public get created(): number {
        return this._created;
    }
    public set created(created: number) {
        this._created = created;
    }

    // Obtened
    public get obtened(): number {
        return this._obtened;
    }
    public set obtened(obtened: number) {
        this._obtened = obtened;
    }
}
```

## File: src/Models/CardHist.ts
```typescript
import { Card } from "./Card";
import { User } from "./User";

export class CardHist {
    private _id: number;
    private _card: Card;
    private _owner: User;
    private _obtened: number;

    constructor(id:number = 0, card:Card = new Card(), owner:User = new User(), obtened:number = Date.now()){
        this._id = id;
        this._card = card;
        this._owner = owner;
        this._obtened = obtened;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Card
    public get card(): Card {
        return this._card;
    }
    public set card(card: Card) {
        this._card = card;
    }

    // Owner
    public get owner(): User {
        return this._owner;
    }
    public set owner(owner: User) {
        this._owner = owner;
    }

    // Obtened
    public get obtened(): number {
        return this._obtened;
    }
    public set obtened(obtened: number) {
        this._obtened = obtened;
    }
}
```

## File: src/Models/CardModel.ts
```typescript
export class CardModel {
    private _id: number;
    private _name: string;
    private _image: string;
    private _description: string;
    private _effect: string;

    constructor(id:number = 0, name:string ="", image:string = "", description:string = "", effect:string = "") {
        this._id = id;
        this._name = name;
        this._image = image;
        this._description = description;
        this._effect = effect;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Name
    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }

    // Image
    public get image(): string {
        return this._image;
    }
    public set image(image: string) {
        this._image = image;
    }

    // Description
    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
    }

    // Effect
    public get effect(): string {
        return this._effect;
    }
    public set effect(effect: string) {
        this._effect = effect;
    }
}
```

## File: src/Models/Rarity.ts
```typescript
export class Rarity {
    private _id: number;
    private _name: string;

    constructor(id:number = 0, name:string = ""){
        this._id = id;
        this._name = name;
    }
    
    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Name
    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }
}
```

## File: src/Models/User.ts
```typescript
export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _password: string;
    private _role: string;
    private _create: number;

    constructor(id:number = 0, name:string = "", email:string = "", password:string = "", role:string = "USER", create:number = Date.now()){   
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
        this._create = create;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Name
    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }

    // Email
    public get email(): string {
        return this._email;
    }
    public set email(email: string) {
        this._email = email;
    }

    // Password
    public get password(): string {
        return this._password;
    }
    public set password(password: string) {
        this._password = password;
    }

    // Role
    public get role(): string {
        return this._role;
    }
    public set role(role: string) {
        this._role = role;
    }

    // Create
    public get create(): number {
        return this._create;
    }
    public set create(create: number) {
        this._create = create;
    }
}
```

## File: src/Routes/AuthRoutes.ts
```typescript
import { Router } from "express";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { UserDAO } from "../DAO/UserDAO";
import { AuthService } from "../Services/AuthService";
import { AuthController } from "../Controllers/AuthController";

export function authRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const userDAO = factoryDAO.createUserDAO();
    const authService = new AuthService(userDAO);
    const authController = new AuthController(authService);

    router.post("/login", authController.login.bind(authController));
    router.post("/register", authController.register.bind(authController))

    return router;
}
```

## File: src/Routes/CardHistRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardHistDAO } from "../DAO/CardHistDAO";
import { CardHistService } from "../Services/CardHistService";
import { CardHistController } from "../Controllers/CardHistController";

export function cardHistRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const cardHistDAO = factoryDAO.createCardHistDAO();
    const cardHistService = new CardHistService(cardHistDAO);
    const cardHistController = new CardHistController(cardHistService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardHistController.getAll.bind(cardHistController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardHistController.get.bind(cardHistController));
    router.post("/", authJWT, requireRole(["ADMIN","USER"]), cardHistController.create.bind(cardHistController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), cardHistController.delete.bind(cardHistController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardHistController.update.bind(cardHistController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardHistController.update.bind(cardHistController));

    return router;
}
```

## File: src/Routes/CardModelRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardModelDAO } from "../DAO/CardModelDAO";
import { CardModelService } from "../Services/CardModelService";
import { CardModelController } from "../Controllers/CardModelController";

export function cardModelRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const cardModelDAO = factoryDAO.createCardModelDAO();
    const cardModelService = new CardModelService(cardModelDAO);
    const cardModelController = new CardModelController(cardModelService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardModelController.getAll.bind(cardModelController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardModelController.get.bind(cardModelController));
    router.post("/", authJWT, requireRole(["ADMIN"]), cardModelController.create.bind(cardModelController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), cardModelController.delete.bind(cardModelController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardModelController.update.bind(cardModelController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardModelController.update.bind(cardModelController));

    return router;
}
```

## File: src/Routes/CardRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

export function cardRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const cardDAO = factoryDAO.createCardDAO();
    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardController.getAll.bind(cardController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardController.get.bind(cardController));
    router.post("/", authJWT, requireRole(["ADMIN"]), cardController.create.bind(cardController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), cardController.delete.bind(cardController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardController.update.bind(cardController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardController.update.bind(cardController));

    return router;
}
```

## File: src/Routes/RarityRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { RarityDAO } from "../DAO/RarityDAO";
import { RarityService } from "../Services/RarityService";
import { RarityController } from "../Controllers/RarityController";

export function rarityRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const rarityDAO = factoryDAO.createRarityDAO();
    const rarityService = new RarityService(rarityDAO);
    const rarityController = new RarityController(rarityService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), rarityController.getAll.bind(rarityController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), rarityController.get.bind(rarityController));
    router.post("/", authJWT, requireRole(["ADMIN"]), rarityController.create.bind(rarityController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), rarityController.delete.bind(rarityController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), rarityController.update.bind(rarityController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), rarityController.update.bind(rarityController));

    return router;
}
```

## File: src/Routes/UserRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { UserDAO } from "../DAO/UserDAO";
import { UserService } from "../Services/UserService";
import { UserController } from "../Controllers/UserController";

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

export function userRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const userDAO = factoryDAO.createUserDAO();
    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    const cardDAO = factoryDAO.createCardDAO();
    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), userController.getAll.bind(userController));
    router.get("/:id", authJWT, requireRole(["ADMIN"]), userController.get.bind(userController));
    router.post("/", authJWT, requireRole(["ADMIN"]), userController.create.bind(userController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), userController.delete.bind(userController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), userController.update.bind(userController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), userController.update.bind(userController));

    router.get("/:id/cards", authJWT, requireRole(["ADMIN"]), cardController.getByUser.bind(cardController));

    router.get("/me", authJWT, requireRole(["ADMIN","USER"]), userController.getMe.bind(userController));
    router.put("/me", authJWT, requireRole(["ADMIN","USER"]), userController.updateMe.bind(userController));
    router.patch("/me", authJWT, requireRole(["ADMIN","USER"]), userController.updateMe.bind(userController));

    router.get("/me/cards", authJWT, requireRole(["ADMIN","USER"]), cardController.getByMe.bind(cardController));

    return router;
}
```

## File: src/Services/AuthService.ts
```typescript
import { UserDAO } from "../DAO/UserDAO";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/User";

const SALT_ROUNDS = 12;

export class AuthService {
    constructor(private userDAO: UserDAO){}

    async login(email:string, password:string):Promise<string> {
        const user = await this.userDAO.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("User incorrect");
        }
        return jwt.sign({sub: user.id,role: user.role},process.env.JWT_SECRET!,{ expiresIn: "1h" });
    }

	async register(user:User){
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
		user.role = "USER";
        user.create = Date.now();
		this.userDAO.insert(user);
	}
}
```

## File: src/Services/CardHistService.ts
```typescript
import { CardHist } from "../Models/CardHist";
import { CardHistDAO } from "../DAO/CardHistDAO";

export class CardHistService {
    constructor(private cardHistDAO: CardHistDAO){}

    async getAll(limit:number, page:number):Promise<CardHist[]>{
        var cardHists:CardHist[] = await this.cardHistDAO.findAll();
        cardHists = cardHists.slice((page-1)*limit, page*limit);
        return cardHists;
    }

    async get(id: number):Promise<CardHist>{
        const cardHist = await this.cardHistDAO.findById(id);
        if(!cardHist){
            throw new Error("CardHist not found");
        }
        return cardHist;
    }

    async create(cardHist:CardHist):Promise<void>{
        cardHist.obtened = Date.now();
        this.cardHistDAO.insert(cardHist);
    }

    async delete(id:number):Promise<void>{
        await this.cardHistDAO.delete(id);
    }

    async update(data:CardHist):Promise<void>{
        await this.cardHistDAO.update(data);
    }
}
```

## File: src/Services/CardModelService.ts
```typescript
import { CardModel } from "../Models/CardModel";
import { CardModelDAO } from "../DAO/CardModelDAO";

export class CardModelService {
    constructor(private cardModelDAO: CardModelDAO){}

    async getAll(limit:number, page:number):Promise<CardModel[]>{
        var cardModels:CardModel[] = await this.cardModelDAO.findAll();
        cardModels = cardModels.slice((page-1)*limit, page*limit);
        return cardModels;
    }

    async get(id: number):Promise<CardModel>{
        const cardModel = await this.cardModelDAO.findById(id);
        if(!cardModel){
            throw new Error("CardModel not found");
        }
        return cardModel;
    }

    async create(cardModel:CardModel):Promise<void>{
        
        this.cardModelDAO.insert(cardModel);
    }

    async delete(id:number):Promise<void>{
        await this.cardModelDAO.delete(id);
    }

    async update(data:CardModel):Promise<void>{
        await this.cardModelDAO.update(data);
    }
}
```

## File: src/Services/CardService.ts
```typescript
import { Card } from "../Models/Card";
import { CardDAO } from "../DAO/CardDAO";

export class CardService {
    constructor(private cardDAO: CardDAO){}

    async getAll(limit:number, page:number):Promise<Card[]>{
        var cards:Card[] = await this.cardDAO.findAll();
        cards = cards.slice((page-1)*limit, page*limit);
        return cards;
    }

    async get(id:number):Promise<Card>{
        const card = await this.cardDAO.findById(id);
        if(!card){
            throw new Error("Card not found");
        }
        return card;
    }

    async getByUser(id:number):Promise<Card[]>{
        const card = await this.cardDAO.findByUser(id);
        if(!card){
            throw new Error("Card not found");
        }
        return card;
    }

    async create(card:Card):Promise<void>{
        card.created = Date.now();
        card.obtened = Date.now();
        this.cardDAO.insert(card);
    }

    async delete(id:number):Promise<void>{
        await this.cardDAO.delete(id);
    }

    async update(data:Card):Promise<void>{
        await this.cardDAO.update(data);
    }
}
```

## File: src/Services/RarityService.ts
```typescript
import { Rarity } from "../Models/Rarity";
import { RarityDAO } from "../DAO/RarityDAO";

export class RarityService {
    constructor(private rarityDAO: RarityDAO){}

    async getAll(limit:number, page:number):Promise<Rarity[]>{
        var raritys:Rarity[] = await this.rarityDAO.findAll();
        raritys = raritys.slice((page-1)*limit, page*limit);
        return raritys;
    }

    async get(id: number):Promise<Rarity>{
        const rarity = await this.rarityDAO.findById(id);
        if(!rarity){
            throw new Error("Rarity not found");
        }
        return rarity;
    }

    async create(rarity:Rarity):Promise<void>{
        
        this.rarityDAO.insert(rarity);
    }

    async delete(id:number):Promise<void>{
        await this.rarityDAO.delete(id);
    }

    async update(data:Rarity):Promise<void>{
        await this.rarityDAO.update(data);
    }
}
```

## File: src/Services/UserService.ts
```typescript
import { User } from "../Models/User";
import { UserDAO } from "../DAO/UserDAO";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export class UserService {
    constructor(private userDAO: UserDAO){}

    async getAll(limit:number, page:number):Promise<User[]>{
        var users:User[] = await this.userDAO.findAll();
        users = users.slice((page-1)*limit, page*limit);
        return users;
    }

    async get(id: number):Promise<User>{
        const user = await this.userDAO.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        user.password = "";
        return user;
    }

    async create(user:User):Promise<void>{
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        user.create = Date.now();
        this.userDAO.insert(user);
    }

    async delete(id:number):Promise<void>{
        await this.userDAO.delete(id);
    }

    async update(data:User):Promise<void>{
        await this.userDAO.update(data);
    }
}
```

## File: src/authMiddleware.ts
```typescript
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        role: string;
      } & JwtPayload;
    }
  }
}

export function authJWT(req:Request, res:Response, next:NextFunction){
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Missing token");

  const tokenString = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!tokenString.startsWith("Bearer ")) return res.status(401).send("Invalid token format");

  const token = tokenString.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { sub:string; role:string; };
    req.user = {
      sub: payload.sub,
      role: payload.role
    };
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

export function requireRole(roles:string[]){
  return (req:Request, res:Response, next:NextFunction) => {
    const role = req.user?.role
    if(!role) return res.status(403).send("No Role");
    if (!roles.includes(role)) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}
```

## File: src/index.ts
```typescript
import express from "express";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET");
if (!process.env.port) throw new Error("Missing port");

import { cardHistRoutes } from "./Routes/CardHistRoutes";
import { cardModelRoutes } from "./Routes/CardModelRoutes";
import { cardRoutes } from "./Routes/CardRoutes";
import { rarityRoutes } from "./Routes/RarityRoutes";
import { userRoutes } from "./Routes/UserRoutes";
import { authRoutes } from "./Routes/AuthRoutes";

import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

const app = express();
app.use(express.json());
const port = process.env.port;

const factoryDAO:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');

app.use("/cardhists", cardHistRoutes(factoryDAO));
app.use("/cardmodels", cardModelRoutes(factoryDAO));
app.use("/cards", cardRoutes(factoryDAO));
app.use("/raritys", rarityRoutes(factoryDAO));
app.use("/users", userRoutes(factoryDAO));

app.use("/auth", authRoutes(factoryDAO));

app.listen(port, () => console.log("API running on port " + port));
```

## File: Tools/SQL/Init.sql
```sql
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(15) NOT NULL CHECK (role IN ('USER', 'ADMIN')) DEFAULT 'USER',
    creation DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS Card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INT NOT NULL,
    id_cardmodel INT NOT NULL,
    id_rarity INT NOT NULL,
    obtened DATETIME NOT NULL,
    created DATETIME NOT NULL,
    CONSTRAINT fk_cards_owner FOREIGN KEY (id_user) REFERENCES User(id),
    CONSTRAINT fk_cards_model FOREIGN KEY (id_cardmodel) REFERENCES CardModel(id),
    CONSTRAINT fk_cards_rarity FOREIGN KEY (id_rarity) REFERENCES Rarity(id)
);

CREATE TABLE IF NOT EXISTS CardModel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(100) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    effect TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS Rarity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS CardHist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_card INT NOT NULL,
    id_user INT NOT NULL,
    obtened DATETIME NOT NULL,
    CONSTRAINT fk_cardshist_card FOREIGN KEY (id_card) REFERENCES Card(id),
    CONSTRAINT fk_cardshist_user FOREIGN KEY (id_user) REFERENCES User(id)
);
```

## File: jest_config.ts
```typescript
import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/Testing/unit'],
	testMatch: ['**/*.test.ts'],
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/*.d.ts',
		'!src/index.ts'
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	verbose: true
};

export default config;
```

## File: package.json
```json
{
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/jest": "^30.0.0",
    "@types/jsonwebtoken": "^9.0.10",
    "jest": "^30.2.0",
    "ts-jest": "^29.4.6",
    "typescript": "^5.9.3"
  },
  "scripts": {
    "build": "tsc",
    "start": "node ./dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "@types/express": "^5.0.3",
    "@types/node": "^7.0.5",
    "bcrypt": "^6.0.0",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.3",
    "sqlite": "^5.1.1",
    "sqlite3": "^5.1.7"
  }
}
```
