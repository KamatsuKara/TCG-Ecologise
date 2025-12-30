This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.
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
- Files matching these patterns are excluded: Conception, Testing, Tools/AddTable.js, Tools/ExecSqlite.js, Tools/RemoveTable.js, Tools/SQL/Refill.sql, tsconfig.json, package.js, TODO.md, .gitignore
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
            const email:string = req.query.email?.toString() || "Error";
            const password:string = req.query.password?.toString()  || "Error";
            const token:string = await this.authService.login(email, password);
            res.json({ token });
        }catch(error:any){
            res.status(404).json({ error: error.message });
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
            res.status(404).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const card = await this.cardService.get(Number(req.params.id));
            res.json(card);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.create(req.body);
            res.json("Card created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.delete(Number(req.params.id));
            res.json("Card deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.cardService.update(req.body);
            res.json("Card updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
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
            res.status(404).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const cardHist = await this.cardHistService.get(Number(req.params.id));
            res.json(cardHist);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.cardHistService.create(req.body);
            res.json("CardHist created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardHistService.delete(Number(req.params.id));
            res.json("CardHist deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.cardHistService.update(req.body);
            res.json("CardHist updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
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
            res.status(404).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const cardModel = await this.cardModelService.get(Number(req.params.id));
            res.json(cardModel);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.cardModelService.create(req.body);
            res.json("CardModel created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.cardModelService.delete(Number(req.params.id));
            res.json("CardModel deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.cardModelService.update(req.body);
            res.json("CardModel updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
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
            res.status(404).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const rarity = await this.rarityService.get(Number(req.params.id));
            res.json(rarity);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.rarityService.create(req.body);
            res.json("Rarity created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.rarityService.delete(Number(req.params.id));
            res.json("Rarity deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.rarityService.update(req.body);
            res.json("Rarity updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
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
            res.status(404).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const user = await this.userService.get(Number(req.params.id));
            res.json(user);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async getMe(req:Request, res:Response):Promise<void>{
        try{
            const user = await this.userService.get(Number(req.user?.sub));
            res.json(user);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    }

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.create(req.body);
            res.json("User created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.delete(Number(req.params.id));
            res.json("User deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.userService.update(req.body);
            res.json("User updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
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
    const pattern:string[] = [
      cardHist.Card.Id.toString(),
      cardHist.Owner.Id.toString(),
      cardHist.Obtened.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardHist:CardHist):Promise<void>{
    const request:string = `UPDATE cardHist SET id_card=?,id_user=?,obtened=? WHERE id = ?`;
    const pattern:string[] = [
      cardHist.Card.Id.toString(),
      cardHist.Owner.Id.toString(),
      cardHist.Obtened.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM cardHist WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<CardHist[]>{
    const request:string = `SELECT * FROM cardHist`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<CardHist|undefined>{
    const request:string = `SELECT * FROM cardHist WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    return (await this.db).get(request, pattern);
  }

  async findByCard(cardId:number):Promise<CardHist[]>{
    const request:string = `SELECT * FROM cardHist WHERE id_card = ?`;
    const pattern:string[] = [
      cardId.toString()
    ];

    return (await this.db).all(request, pattern);
  }

  async findByUser(userId:number):Promise<CardHist[]>{
    const request:string = `SELECT * FROM cardHist WHERE id_user = ?`;
    const pattern:string[] = [
      userId.toString()
    ];

    return (await this.db).all(request, pattern);
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
    const request:string = `INSERT INTO cardModel(name,image,description,effect) VALUES (?,?,?,?)`;
    const pattern:string[] = [
      cardModel.Name,
      cardModel.Image,
      cardModel.Description,
      cardModel.Effect
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardModel:CardModel):Promise<void>{
    const request:string = `UPDATE cardModel SET name=?,image=?,description=?,effect=? WHERE id=?`;
    const pattern:string[] = [
      cardModel.Name,
      cardModel.Image,
      cardModel.Description,
      cardModel.Effect,
      cardModel.Id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM cardModel WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<CardModel[]>{
    const request:string = `SELECT * FROM cardModel`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<CardModel|undefined>{
    const request:string = `SELECT * FROM cardModel WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    return (await this.db).get(request, pattern);
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
    const pattern:string[] = [
        card.Owner.Id.toString(),
        card.CardModel.Id.toString(),
        card.Rarity.Id.toString(),
        card.Obtened.toString(),
        card.Created.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(card:Card):Promise<void>{
    const request:string = `UPDATE card SET id_user=?,id_cardmodel=?,id_rarity=?,obtened=?,created=? WHERE id=?`;
    const pattern:string[] = [
        card.Owner.Id.toString(),
        card.CardModel.Id.toString(),
        card.Rarity.Id.toString(),
        card.Obtened.toString(),
        card.Created.toString(),
        card.Id.toString(),
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
    const pattern:string[] = [
      rarity.Name
    ];

    (await this.db).run(request, pattern);
  }

  async update(rarity:Rarity):Promise<void>{
    const request:string = `UPDATE rarity SET name=? WHERE id=?`;
    const pattern:string[] = [
      rarity.Name,
      rarity.Id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(id:number):Promise<void>{
    const request:string = `DELETE FROM rarity WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<Rarity[]>{
    const request:string = `SELECT * FROM rarity`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<Rarity|undefined>{
    const request:string = `SELECT * FROM rarity WHERE id = ?`;
    const pattern:string[] = [
      id.toString()
    ];

    return (await this.db).get(request, pattern);
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
    private id: number;
    private owner: User;
    private cardModel: CardModel;
    private rarity: Rarity;
    private created: number;
    private obtened: number;

    constructor(id:number = 0, owner:User = new User(), cardModel:CardModel = new CardModel(), rarity:Rarity = new Rarity(), created:number = Date.now(), obtened:number = Date.now()){
        this.id = id;
        this.owner = owner;
        this.cardModel = cardModel;
        this.rarity = rarity;
        this.created = created;
        this.obtened = obtened;
    }

    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Owner
    public get Owner(): User {
        return this.owner;
    }
    public set Owner(owner: User) {
        this.owner = owner;
    }

    // CardModel
    public get CardModel(): CardModel {
        return this.cardModel;
    }
    public set CardModel(cardModel: CardModel) {
        this.cardModel = cardModel;
    }

    // Rarity
    public get Rarity(): Rarity {
        return this.rarity;
    }
    public set Rarity(rarity: Rarity) {
        this.rarity = rarity;
    }

    // Created
    public get Created(): number {
        return this.created;
    }
    public set Created(created: number) {
        this.created = created;
    }

    // Obtened
    public get Obtened(): number {
        return this.obtened;
    }
    public set Obtened(obtened: number) {
        this.obtened = obtened;
    }
}
```

## File: src/Models/CardHist.ts
```typescript
import { Card } from "./Card";
import { User } from "./User";

export class CardHist {
    private id: number;
    private card: Card;
    private owner: User;
    private obtened: number;

    constructor(id:number = 0, card:Card = new Card(), owner:User = new User(), obtened:number = Date.now()){
        this.id = id;
        this.card = card;
        this.owner = owner;
        this.obtened = obtened;
    }

    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Card
    public get Card(): Card {
        return this.card;
    }
    public set Card(card: Card) {
        this.card = card;
    }

    // Owner
    public get Owner(): User {
        return this.owner;
    }
    public set Owner(owner: User) {
        this.owner = owner;
    }

    // Obtened
    public get Obtened(): number {
        return this.obtened;
    }
    public set Obtened(obtened: number) {
        this.obtened = obtened;
    }
}
```

## File: src/Models/CardModel.ts
```typescript
export class CardModel {
    private id: number;
    private name: string;
    private image: string;
    private description: string;
    private effect: string;

    constructor(id:number = 0, name:string ="", image:string = "", description:string = "", effect:string = "") {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.effect = effect;
    }

    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Name
    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }

    // Image
    public get Image(): string {
        return this.image;
    }
    public set Image(image: string) {
        this.image = image;
    }

    // Description
    public get Description(): string {
        return this.description;
    }
    public set Description(description: string) {
        this.description = description;
    }

    // Effect
    public get Effect(): string {
        return this.effect;
    }
    public set Effect(effect: string) {
        this.effect = effect;
    }
}
```

## File: src/Models/Rarity.ts
```typescript
export class Rarity {
    private id: number;
    private name: string;

    constructor(id:number = 0, name:string = ""){
        this.id = id;
        this.name = name;
    }
    
    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Name
    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }
}
```

## File: src/Models/User.ts
```typescript
export class User {
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private role: string;
    private create: number;

    constructor(id:number = 0, name:string = "", email:string = "", password:string = "", role:string = "USER", create:number = Date.now()){   
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.create = create;
    }

    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Name
    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }

    // Email
    public get Email(): string {
        return this.email;
    }
    public set Email(email: string) {
        this.email = email;
    }

    // Password
    public get Password(): string {
        return this.password;
    }
    public set Password(password: string) {
        this.password = password;
    }

    // Role
    public get Role(): string {
        return this.role;
    }
    public set Role(role: string) {
        this.role = role;
    }

    // Create
    public get Create(): number {
        return this.create;
    }
    public set Create(create: number) {
        this.create = create;
    }
}
```

## File: src/Routes/AuthRoutes.ts
```typescript
import { Router } from "express";

import { UserDAO } from "../DAO/UserDAO";
import { AuthService } from "../Services/AuthService";
import { AuthController } from "../Controllers/AuthController";

export function authRoutes(UserDAO:UserDAO): Router {
    const router = Router();

    const authService = new AuthService(UserDAO);
    const authController = new AuthController(authService);

    router.post("/login", authController.login);

    return router;
}
```

## File: src/Routes/CardHistRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { CardHistDAO } from "../DAO/CardHistDAO";
import { CardHistService } from "../Services/CardHistService";
import { CardHistController } from "../Controllers/CardHistController";

export function cardHistRoutes(cardHistDAO:CardHistDAO): Router {
    const router = Router();

    const cardHistService = new CardHistService(cardHistDAO);
    const cardHistController = new CardHistController(cardHistService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardHistController.getAll);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardHistController.get);
    router.post("/", authJWT, requireRole(["ADMIN","USER"]), cardHistController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN"]), cardHistController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardHistController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardHistController.update);

    return router;
}
```

## File: src/Routes/CardModelRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { CardModelDAO } from "../DAO/CardModelDAO";
import { CardModelService } from "../Services/CardModelService";
import { CardModelController } from "../Controllers/CardModelController";

export function cardModelRoutes(cardModelDAO:CardModelDAO): Router {
    const router = Router();

    const cardModelService = new CardModelService(cardModelDAO);
    const cardModelController = new CardModelController(cardModelService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardModelController.getAll);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardModelController.get);
    router.post("/", authJWT, requireRole(["ADMIN"]), cardModelController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN"]), cardModelController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardModelController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardModelController.update);

    return router;
}
```

## File: src/Routes/CardRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

export function cardRoutes(cardDAO:CardDAO): Router {
    const router = Router();

    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardController.getAll);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardController.get);
    router.post("/", authJWT, requireRole(["ADMIN"]), cardController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN"]), cardController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardController.update);

    return router;
}
```

## File: src/Routes/RarityRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { RarityDAO } from "../DAO/RarityDAO";
import { RarityService } from "../Services/RarityService";
import { RarityController } from "../Controllers/RarityController";

export function rarityRoutes(rarityDAO:RarityDAO): Router {
    const router = Router();

    const rarityService = new RarityService(rarityDAO);
    const rarityController = new RarityController(rarityService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), rarityController.getAll);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), rarityController.get);
    router.post("/", authJWT, requireRole(["ADMIN"]), rarityController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN"]), rarityController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN"]), rarityController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), rarityController.update);

    return router;
}
```

## File: src/Routes/UserRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { UserDAO } from "../DAO/UserDAO";
import { UserService } from "../Services/UserService";
import { UserController } from "../Controllers/UserController";

export function userRoutes(userDAO:UserDAO): Router {
    const router = Router();

    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), userController.getAll);
    router.get("/me", authJWT, requireRole(["ADMIN","USER"]), userController.getMe);
    router.get("/:id", authJWT, requireRole(["ADMIN"]), userController.get);
    router.post("/", authJWT, requireRole(["ADMIN"]), userController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN"]), userController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN"]), userController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), userController.update);

    return router;
}
```

## File: src/Services/AuthService.ts
```typescript
import { UserDAO } from "../DAO/UserDAO";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    constructor(private userDAO: UserDAO){}

  async login(email:string, password:string):Promise<string> {
    const user = await this.userDAO.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.Password))) {
      throw new Error("User incorrect");
    }

    return jwt.sign(
      {
        sub: user.Id,
        role: user.Role
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
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

    async get(id: number):Promise<Card>{
        const card = await this.cardDAO.findById(id);
        if(!card){
            throw new Error("Card not found");
        }
        return card;
    }

    async create(card:Card):Promise<void>{
        
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
        return user;
    }

    async create(user:User):Promise<void>{
        user.Password = await bcrypt.hash(user.Password, SALT_ROUNDS);
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
    if ( roles.includes(role)) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}
```

## File: src/index.ts
```typescript
import express from "express";

import { cardHistRoutes } from "./Routes/CardHistRoutes";
import { cardModelRoutes } from "./Routes/CardModelRoutes";
import { cardRoutes } from "./Routes/CardRoutes";
import { rarityRoutes } from "./Routes/RarityRoutes";
import { userRoutes } from "./Routes/UserRoutes";

import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

const app = express()
const port = 3001

const factoryDAO:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');

app.use("/cardhists", cardHistRoutes(factoryDAO.createCardHistDAO()));
app.use("/cardmodels", cardModelRoutes(factoryDAO.createCardModelDAO()));
app.use("/cards", cardRoutes(factoryDAO.createCardDAO()));
app.use("/raritys", rarityRoutes(factoryDAO.createRarityDAO()));
app.use("/users", userRoutes(factoryDAO.createUserDAO()));

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
    creation DATETIME
);

CREATE TABLE IF NOT EXISTS Card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INT NOT NULL,
    id_cardmodel INT NOT NULL,
    id_rarity INT NOT NULL,
    obtened DATETIME,
    created DATETIME,
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
    obtened DATETIME,
    CONSTRAINT fk_cardshist_card FOREIGN KEY (id_card) REFERENCES Card(id),
    CONSTRAINT fk_cardshist_user FOREIGN KEY (id_user) REFERENCES User(id)
);
```

## File: package.json
```json
{
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/jsonwebtoken": "^9.0.10",
    "typescript": "^5.9.3"
  },
  "scripts": {
    "build": "tsc",
    "start": "node ./dist/index.js"
  },
  "dependencies": {
    "@types/express": "^5.0.3",
    "@types/node": "^7.0.5",
    "bcrypt": "^6.0.0",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.3",
    "sqlite": "^5.1.1",
    "sqlite3": "^5.1.7"
  }
}
```
