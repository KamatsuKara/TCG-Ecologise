This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where comments have been removed, security check has been disabled.

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
- Files matching these patterns are excluded: Conception, Tools, .gitignore
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  Controllers/
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
  db/
    execDB.js
    Init.sql
    initDB.js
  Models/
    Card.ts
    CardHist.ts
    CardModel.ts
    Rarity.ts
    User.ts
  Routes/
    CardHistRoutes.ts
    CardModelRoutes.ts
    CardRoutes.ts
    RarityRoutes.ts
    UserRoutes.ts
  Services/
    CardHistService.ts
    CardModelService.ts
    CardService.ts
    RarityService.ts
    UserService.ts
  index.ts
package.json
tsconfig.json
```

# Files

## File: src/Controllers/CardController.ts
```typescript
import { Request, Response } from "express";
import { CardService } from "../Services/CardService";

export class CardController{
    constructor(private cardService:CardService){}

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cards = await this.cardService.getAll();
            res.json(cards);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const card = await this.cardService.get(Number(req.params.id));
            res.json(card);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardService.create(req.body);
            res.json("Card created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardService.delete(Number(req.params.id));
            res.json("Card deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
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

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardHists = await this.cardHistService.getAll();
            res.json(cardHists);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const cardHist = await this.cardHistService.get(Number(req.params.id));
            res.json(cardHist);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardHistService.create(req.body);
            res.json("CardHist created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardHistService.delete(Number(req.params.id));
            res.json("CardHist deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
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

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const cardModels = await this.cardModelService.getAll();
            res.json(cardModels);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const cardModel = await this.cardModelService.get(Number(req.params.id));
            res.json(cardModel);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardModelService.create(req.body);
            res.json("CardModel created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.cardModelService.delete(Number(req.params.id));
            res.json("CardModel deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
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

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const raritys = await this.rarityService.getAll();
            res.json(raritys);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const rarity = await this.rarityService.get(Number(req.params.id));
            res.json(rarity);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.rarityService.create(req.body);
            res.json("Rarity created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.rarityService.delete(Number(req.params.id));
            res.json("Rarity deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
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

    getAll = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const users = await this.userService.getAll();
            res.json(users);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get = async (req:Request, res:Response):Promise<void> => {
        try{
            const user = await this.userService.get(Number(req.params.id));
            res.json(user);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.userService.create(req.body);
            res.json("User created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.userService.delete(Number(req.params.id));
            res.json("User deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req:Request, res:Response):Promise<void> => {
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
      cardHist.getCard().getId().toString(),
      cardHist.getOwner().getId().toString(),
      cardHist.getObtened().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardHist:CardHist):Promise<void>{
    const request:string = `UPDATE cardHist SET id_card=?,id_user=?,obtened=? WHERE id = ?`;
    const pattern:string[] = [
      cardHist.getCard().getId().toString(),
      cardHist.getOwner().getId().toString(),
      cardHist.getObtened().toString()
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
      cardModel.getName(),
      cardModel.getImage(),
      cardModel.getDescription(),
      cardModel.getEffect()
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardModel:CardModel):Promise<void>{
    const request:string = `UPDATE cardModel SET name=?,image=?,description=?,effect=? WHERE id=?`;
    const pattern:string[] = [
      cardModel.getName(),
      cardModel.getImage(),
      cardModel.getDescription(),
      cardModel.getEffect(),
      cardModel.getId().toString()
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
        card.getOwner().getId().toString(),
        card.getCardModel().getId().toString(),
        card.getRarity().getId().toString(),
        card.getObtened().toString(),
        card.getCreated().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(card:Card):Promise<void>{
    const request:string = `UPDATE card SET id_user=?,id_cardmodel=?,id_rarity=?,obtened=?,created=? WHERE id=?`;
    const pattern:string[] = [
        card.getOwner().getId().toString(),
        card.getCardModel().getId().toString(),
        card.getRarity().getId().toString(),
        card.getObtened().toString(),
        card.getCreated().toString(),
        card.getId().toString(),
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
      rarity.getName()
    ];

    (await this.db).run(request, pattern);
  }

  async update(rarity:Rarity):Promise<void>{
    const request:string = `UPDATE rarity SET name=? WHERE id=?`;
    const pattern:string[] = [
      rarity.getName(),
      rarity.getId().toString()
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
}
```

## File: src/db/execDB.js
```javascript
import sqlite3 from 'sqlite3';
import fs from 'fs';

const db = new sqlite3.Database("../../dist/db/database.db", (err) => {
    if (err) {
        throw err;
    }
    console.log('Connexion à la base de données SQLite réussie.');
});

const request = "./Request.sql"

fs.readFile(request, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    const requetes = data.toString().split(';');
    if(requetes[requetes.length-1] == "") requetes.pop();
    db.serialize(() => {
        requetes.forEach(requete => {
            db.all(requete, [], (err, rows) => {
                if (err) {
                    throw err
                }
                console.log(rows);
            });
        })
    });
    db.close();
});
```

## File: src/db/Init.sql
```sql
PRAGMA foreign_keys = ON;

CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    creation DATETIME
);

CREATE TABLE Card (
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

CREATE TABLE CardModel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(100) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    effect TEXT DEFAULT NULL
);

CREATE TABLE Rarity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE CardHist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_card INT NOT NULL,
    id_user INT NOT NULL,
    obtened DATETIME,
    CONSTRAINT fk_cardshist_card FOREIGN KEY (id_card) REFERENCES Card(id),
    CONSTRAINT fk_cardshist_user FOREIGN KEY (id_user) REFERENCES User(id)
);
```

## File: src/db/initDB.js
```javascript
import sqlite3 from 'sqlite3';
import fs from 'fs';

const db = new sqlite3.Database("../../dist/db/database.db", (err) => {
    if (err) {
        throw err;
    }
    console.log('Connexion à la base de données SQLite réussie.');
});

const request = "./Init.sql"

fs.readFile(request, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    const requetes = data.toString().split(';');
    if(requetes[requetes.length-1] == "") requetes.pop();
    db.serialize(() => {
        requetes.forEach(requete => {
            db.all(requete, [], (err, rows) => {
                if (err) {
                    throw err
                }
                console.log(rows);
            });
        })
    });
    db.close();
});
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

    public getId():number{
        return this.id;
    }

    public getOwner():User{
        return this.owner;
    }

    public getCardModel():CardModel{
        return this.cardModel;
    }

    public getRarity():Rarity{
        return this.rarity;
    }

    public getCreated():number{
        return this.created;
    }

    public getObtened():number{
        return this.obtened;
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

    public getId():number{
        return this.id;
    }

    public getCard():Card{
        return this.card;
    }

    public getOwner():User{
        return this.owner;
    }

    public getObtened():number{
        return this.obtened;
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

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getImage(): string {
        return this.image;
    }

    public getDescription(): string {
        return this.description;
    }

    public getEffect(): string {
        return this.effect;
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

    public getId():number{
        return this.id;
    }

    public getName():string{
        return this.name;
    }
}
```

## File: src/Models/User.ts
```typescript
export class User {
    private id: number;
    private name: string;
    private create: number;

    constructor(id:number = 0, name:string = "", create:number = Date.now()){
        this.id = id;
        this.name = name;
        this.create = create;
    }

    public getId():number{
        return this.id;
    }

    public getName():string{
        return this.name;
    }

    public getCreate():number{
        return this.create;
    }
}
```

## File: src/Routes/CardHistRoutes.ts
```typescript
import { Router } from "express";

import { CardHistDAO } from "../DAO/CardHistDAO";
import { CardHistService } from "../Services/CardHistService";
import { CardHistController } from "../Controllers/CardHistController";

export function cardHistRoutes(cardHistDAO:CardHistDAO): Router {
    const router = Router();

    const cardHistService = new CardHistService(cardHistDAO);
    const cardHistController = new CardHistController(cardHistService);

    router.get("/", cardHistController.getAll);
    router.get("/:id", cardHistController.get);
    router.post("/", cardHistController.create);
    router.delete("/id", cardHistController.delete);
    router.put("/:id", cardHistController.update);
    router.patch("/:id", cardHistController.update);

    return router;
}
```

## File: src/Routes/CardModelRoutes.ts
```typescript
import { Router } from "express";

import { CardModelDAO } from "../DAO/CardModelDAO";
import { CardModelService } from "../Services/CardModelService";
import { CardModelController } from "../Controllers/CardModelController";

export function cardModelRoutes(cardModelDAO:CardModelDAO): Router {
    const router = Router();

    const cardModelService = new CardModelService(cardModelDAO);
    const cardModelController = new CardModelController(cardModelService);

    router.get("/", cardModelController.getAll);
    router.get("/:id", cardModelController.get);
    router.post("/", cardModelController.create);
    router.delete("/id", cardModelController.delete);
    router.put("/:id", cardModelController.update);
    router.patch("/:id", cardModelController.update);

    return router;
}
```

## File: src/Routes/CardRoutes.ts
```typescript
import { Router } from "express";

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

export function cardRoutes(cardDAO:CardDAO): Router {
    const router = Router();

    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    router.get("/", cardController.getAll);
    router.get("/:id", cardController.get);
    router.post("/", cardController.create);
    router.delete("/id", cardController.delete);
    router.put("/:id", cardController.update);
    router.patch("/:id", cardController.update);

    return router;
}
```

## File: src/Routes/RarityRoutes.ts
```typescript
import { Router } from "express";

import { RarityDAO } from "../DAO/RarityDAO";
import { RarityService } from "../Services/RarityService";
import { RarityController } from "../Controllers/RarityController";

export function rarityRoutes(rarityDAO:RarityDAO): Router {
    const router = Router();

    const rarityService = new RarityService(rarityDAO);
    const rarityController = new RarityController(rarityService);

    router.get("/", rarityController.getAll);
    router.get("/:id", rarityController.get);
    router.post("/", rarityController.create);
    router.delete("/id", rarityController.delete);
    router.put("/:id", rarityController.update);
    router.patch("/:id", rarityController.update);

    return router;
}
```

## File: src/Routes/UserRoutes.ts
```typescript
import { Router } from "express";

import { UserDAO } from "../DAO/UserDAO";
import { UserService } from "../Services/UserService";
import { UserController } from "../Controllers/UserController";

export function userRoutes(userDAO:UserDAO): Router {
    const router = Router();

    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    router.get("/", userController.getAll);
    router.get("/:id", userController.get);
    router.post("/", userController.create);
    router.delete("/id", userController.delete);
    router.put("/:id", userController.update);
    router.patch("/:id", userController.update);

    return router;
}
```

## File: src/Services/CardHistService.ts
```typescript
import { CardHist } from "../Models/CardHist";
import { CardHistDAO } from "../DAO/CardHistDAO";

export class CardHistService {
    constructor(private cardHistDAO: CardHistDAO){}

    async getAll():Promise<CardHist[]>{
        return await this.cardHistDAO.findAll();
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

    async getAll():Promise<CardModel[]>{
        return await this.cardModelDAO.findAll();
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

    async getAll():Promise<Card[]>{
        return await this.cardDAO.findAll();
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

    async getAll():Promise<Rarity[]>{
        return await this.rarityDAO.findAll();
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

export class UserService {
    constructor(private userDAO: UserDAO){}

    async getAll():Promise<User[]>{
        return await this.userDAO.findAll();
    }

    async get(id: number):Promise<User>{
        const user = await this.userDAO.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }

    async create(user:User):Promise<void>{

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
const port = 3000

const factoryDAO:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');

app.use("/cardHists", cardHistRoutes(factoryDAO.createCardHistDAO()));
app.use("/cardModels", cardModelRoutes(factoryDAO.createCardModelDAO()));
app.use("/cards", cardRoutes(factoryDAO.createCardDAO()));
app.use("/raritys", rarityRoutes(factoryDAO.createRarityDAO()));
app.use("/users", userRoutes(factoryDAO.createUserDAO()));

app.listen(port, () => console.log("API running on port " + port));
```

## File: package.json
```json
{
  "devDependencies": {
    "typescript": "^5.9.3"
  },
  "scripts": {
    "build": "tsc",
    "start": "node ./dist/index.js"
  },
  "dependencies": {
    "@types/express": "^5.0.3",
    "@types/node": "^7.0.5",
    "express": "^5.1.0",
    "sqlite": "^5.1.1",
    "sqlite3": "^5.1.7"
  }
}
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "rootDir": "./src/",                              /* Specify the root folder within your source files. */
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    "outDir": "./dist/",                              /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```
