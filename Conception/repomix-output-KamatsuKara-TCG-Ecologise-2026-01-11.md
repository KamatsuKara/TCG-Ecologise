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
- Only files matching these patterns are included: src/**, Tools/SQL/Init.sql
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  Controllers/
    AuthController.ts
    BoosterController.ts
    BoosterDropRateController.ts
    BoosterModelController.ts
    CardController.ts
    CardHistController.ts
    CardModelController.ts
    RarityController.ts
    RefreshTokenController.ts
    TradeController.ts
    UserController.ts
  DAO/
    Sqlite/
      BoosterDropRateSqliteDAO.ts
      BoosterModelSqliteDAO.ts
      BoosterSqliteDAO.ts
      CardHistSqliteDAO.ts
      CardModelSqliteDAO.ts
      CardSqliteDAO.ts
      CardTradeSqliteDAO.ts
      FactorySqliteDAO.ts
      RaritySqliteDAO.ts
      RefreshTokenSqliteDAO.ts
      TradeSqliteDAO.ts
      UserSqliteDAO.ts
    BoosterDAO.ts
    BoosterDropRateDAO.ts
    BoosterModelDAO.ts
    CardDAO.ts
    CardHistDAO.ts
    CardModelDAO.ts
    CardTradeDAO.ts
    FactoryDAO.ts
    RarityDAO.ts
    RefreshTokenDAO.ts
    TradeDAO.ts
    UserDAO.ts
  Middleware/
    auditMiddleware.ts
    authMiddleware.ts
  Models/
    Booster.ts
    BoosterDropRate.ts
    BoosterModel.ts
    Card.ts
    CardHist.ts
    CardModel.ts
    CardTrade.ts
    Rarity.ts
    RefreshToken.ts
    Trade.ts
    User.ts
  Routes/
    AuthRoutes.ts
    BoosterDropRateRoutes.ts
    BoosterModelRoutes.ts
    BoosterRoutes.ts
    CardHistRoutes.ts
    CardModelRoutes.ts
    CardRoutes.ts
    RarityRoutes.ts
    TradeRoutes.ts
    UserRoutes.ts
  Services/
    AuthService.ts
    BoosterDropRateService.ts
    BoosterModelService.ts
    BoosterService.ts
    CardHistService.ts
    CardModelService.ts
    CardService.ts
    RarityService.ts
    RefreshTokenService.ts
    TradeService.ts
    UserService.ts
  index.ts
Tools/
  SQL/
    Init.sql
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
            const security: any = await this.authService.login(email, password);
            const jwtToken: string = Array.isArray(security) ? security[0] : security;
            const refreshToken: string | undefined = Array.isArray(security) ? security[1] : undefined;
            if (refreshToken && typeof (res as any).cookie === 'function') {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000
                });
            }
            res.json({ token: jwtToken });
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

    async refresh(req:Request, res:Response):Promise<void>{
        try{
            const refreshToken:string = req.cookies.refreshToken;
            const security:string[] = await this.authService.refresh(refreshToken);
            const jwt:string = security[0];
            const newRefreshToken:string = security[1];
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ jwt });
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }   
    }
}
```

## File: src/Controllers/BoosterController.ts
```typescript
import { Request, Response } from "express";
import { BoosterService } from "../Services/BoosterService";

export class BoosterController{
    constructor(private boosterService:BoosterService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const boosters = await this.boosterService.getAll(limit, page);
            res.json(boosters);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const booster = await this.boosterService.get(Number(req.params.id));
            res.json(booster);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterService.create(req.body);
            res.json("Booster created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterService.delete(Number(req.params.id));
            res.json("Booster deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterService.update(req.body);
            res.json("Booster updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}
```

## File: src/Controllers/BoosterDropRateController.ts
```typescript
import { Request, Response } from "express";
import { BoosterDropRateService } from "../Services/BoosterDropRateService";

export class BoosterDropRateController{
    constructor(private boosterDropRateService:BoosterDropRateService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const boosterDropRates = await this.boosterDropRateService.getAll(limit, page);
            res.json(boosterDropRates);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const boosterDropRate = await this.boosterDropRateService.get(Number(req.params.id));
            res.json(boosterDropRate);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterDropRateService.create(req.body);
            res.json("BoosterDropRate created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterDropRateService.delete(Number(req.params.id));
            res.json("BoosterDropRate deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterDropRateService.update(req.body);
            res.json("BoosterDropRate updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
}
```

## File: src/Controllers/BoosterModelController.ts
```typescript
import { Request, Response } from "express";
import { BoosterModelService } from "../Services/BoosterModelService";

export class BoosterModelController{
    constructor(private boosterModelService:BoosterModelService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const boosterModels = await this.boosterModelService.getAll(limit, page);
            res.json(boosterModels);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const boosterModel = await this.boosterModelService.get(Number(req.params.id));
            res.json(boosterModel);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterModelService.create(req.body);
            res.json("BoosterModel created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterModelService.delete(Number(req.params.id));
            res.json("BoosterModel deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.boosterModelService.update(req.body);
            res.json("BoosterModel updated");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };
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

## File: src/Controllers/RefreshTokenController.ts
```typescript
import { Request, Response } from "express";
import { RefreshTokenService } from "../Services/RefreshTokenService";

export class RefreshTokenController{
    constructor(private refreshTokenService:RefreshTokenService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const refreshTokens = await this.refreshTokenService.getAll(limit, page);
            res.json(refreshTokens);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const refreshToken = await this.refreshTokenService.get(Number(req.params.id));
            res.json(refreshToken);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.refreshTokenService.create(req.body);
            res.json("RefreshToken created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.refreshTokenService.delete(Number(req.params.id));
            res.json("RefreshToken deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.refreshTokenService.update(req.body);
            res.json("RefreshToken updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}
```

## File: src/Controllers/TradeController.ts
```typescript
import { Request, Response } from "express";
import { TradeService } from "../Services/TradeService";

export class TradeController{
    constructor(private tradeService:TradeService){}

    async getAll(req:Request, res:Response):Promise<void>{
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const trades = await this.tradeService.getAll(limit, page);
            res.json(trades);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async get(req:Request, res:Response):Promise<void>{
        try{
            const trade = await this.tradeService.get(Number(req.params.id));
            res.json(trade);
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async create(req:Request, res:Response):Promise<void>{
        try{
            await this.tradeService.create(req.body);
            res.json("Trade created");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async delete(req:Request, res:Response):Promise<void>{
        try{
            await this.tradeService.delete(Number(req.params.id));
            res.json("Trade deleted");
        }catch(error:any){
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    };

    async update(req:Request, res:Response):Promise<void>{
        try{
            await this.tradeService.update(req.body);
            res.json("Trade updated");
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

## File: src/DAO/Sqlite/BoosterDropRateSqliteDAO.ts
```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { BoosterDropRate } from "../../Models/BoosterDropRate";
import { BoosterDropRateDAO } from "../BoosterDropRateDAO";
import { BoosterModel } from "../../Models/BoosterModel";
import { Rarity } from "../../Models/Rarity";

export class BoosterDropRateSqliteDAO implements BoosterDropRateDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(boosterDropRate:BoosterDropRate):Promise<void>{
    const request: string = `INSERT INTO boosterDropRate(id_rarity, id_boostermodel, guarantee, drop_rate) VALUES (?, ?, ?, ?)`;
    const pattern: string[] = [
      boosterDropRate.rarity.id.toString(),
      boosterDropRate.boosterModel.id.toString(),
      boosterDropRate.guarantee.toString(),
      boosterDropRate.dropRate.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(boosterDropRate:BoosterDropRate):Promise<void>{
    const patterns: string[] = [];
    const values: string[] = [];

    if (boosterDropRate.rarity != null) {
      patterns.push("id_rarity=?");
      values.push(boosterDropRate.rarity.id.toString());
    }
    if (boosterDropRate.boosterModel != null) {
      patterns.push("id_boostermodel=?");
      values.push(boosterDropRate.boosterModel.id.toString());
    }
    if (boosterDropRate.guarantee != null) {
      patterns.push("guarantee=?");
      values.push(boosterDropRate.guarantee.toString());
    }
    if (boosterDropRate.dropRate != null) {
      patterns.push("drop_rate=?");
      values.push(boosterDropRate.dropRate.toString());
    }

    const request: string = `UPDATE boosterDropRate SET ${patterns.join(", ")} WHERE id=?`;
    values.push(boosterDropRate.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id:number):Promise<void>{
    const request: string = `DELETE FROM boosterDropRate WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<BoosterDropRate[]>{
    const request: string = `SELECT * FROM boosterDropRate`;

    const rows = await (await this.db).all(request);
    return rows.map(row => new BoosterDropRate(
      row.id,
      new Rarity(row.id_rarity),
      new BoosterModel(row.id_boostermodel),
      row.guarantee,
      row.drop_rate
    ));
  }

  async findById(id:number):Promise<BoosterDropRate|undefined>{
    const request: string = `SELECT * FROM boosterDropRate WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new BoosterDropRate(
      row.id,
      new Rarity(row.id_rarity),
      new BoosterModel(row.id_boostermodel),
      row.guarantee,
      row.drop_rate
    ) : undefined;
  }

  async findByBoosterModel(boosterModelId: number): Promise<BoosterDropRate[]> {
    const request: string = `SELECT * FROM boosterDropRate WHERE id_boostermodel = ?`;
    const pattern: string[] = [
      boosterModelId.toString()
    ];

    const rows = await (await this.db).all(request, pattern);
    return rows.map(row => new BoosterDropRate(
      row.id,
      new Rarity(row.id_rarity),
      new BoosterModel(row.id_boostermodel),
      row.guarantee,
      row.drop_rate
    ));
  }
}
```

## File: src/DAO/Sqlite/BoosterModelSqliteDAO.ts
```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { BoosterModel } from "../../Models/BoosterModel";
import { BoosterModelDAO } from "../BoosterModelDAO";

export class BoosterModelSqliteDAO implements BoosterModelDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(boosterModel:BoosterModel):Promise<void>{
    const patterns: string[] = ["name", "nmbCard", "category"];
    const values: string[] = [
      boosterModel.name,
      boosterModel.nmbCard.toString(),
      boosterModel.category
    ];

    const request: string = `INSERT INTO boosterModel(${patterns.join(",")}) VALUES (${Array(values.length).fill("?").join(",")})`;

    (await this.db).run(request, values);
  }

  async update(boosterModel:BoosterModel):Promise<void>{
    const patterns: string[] = [];
    const values: string[] = [];

    if (boosterModel.name != null) {
      patterns.push("name=?");
      values.push(boosterModel.name);
    }
    if (boosterModel.nmbCard != null) {
      patterns.push("nmbCard=?");
      values.push(boosterModel.nmbCard.toString());
    }
    if (boosterModel.category != null) {
      patterns.push("category=?");
      values.push(boosterModel.category);
    }

    const request: string = `UPDATE boosterModel SET ${patterns.join(", ")} WHERE id=?`;
    values.push(boosterModel.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id:number):Promise<void>{
    const request: string = `DELETE FROM boosterModel WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<BoosterModel[]>{
    const request: string = `SELECT * FROM boosterModel`;
    const rows = await (await this.db).all(request);
    
    return rows.map(row => new BoosterModel(
      row.id,
      row.name,
      row.nmbCard,
      row.category
    ));
  }

  async findById(id:number):Promise<BoosterModel|undefined>{
    const request: string = `SELECT * FROM boosterModel WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new BoosterModel(
      row.id,
      row.name,
      row.nmbCard,
      row.category
    ):undefined;
  }
}
```

## File: src/DAO/Sqlite/BoosterSqliteDAO.ts
```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Booster } from "../../Models/Booster";
import { BoosterDAO } from "../BoosterDAO";
import { BoosterModel } from "../../Models/BoosterModel";
import { User } from "../../Models/User";

export class BoosterSqliteDAO implements BoosterDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(booster:Booster):Promise<void>{
    const request: string = `INSERT INTO booster(seed, id_boostermodel, id_user, obtened, created) VALUES (?, ?, ?, ?, ?)`;
    const pattern: string[] = [
      booster.seed.toString(),
      booster.boosterModel.id.toString(),
      booster.user.id.toString(),
      booster.obtened.toString(),
      booster.created.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(booster:Booster):Promise<void>{
    const patterns: string[] = [];
    const values: string[] = [];

    if (booster.seed != null) {
      patterns.push("seed=?");
      values.push(booster.seed.toString());
    }
    if (booster.boosterModel != null) {
      patterns.push("id_boostermodel=?");
      values.push(booster.boosterModel.id.toString());
    }
    if (booster.user != null) {
      patterns.push("id_user=?");
      values.push(booster.user.id.toString());
    }
    if (booster.obtened != null) {
      patterns.push("obtened=?");
      values.push(booster.obtened.toString());
    }
    if (booster.created != null) {
      patterns.push("created=?");
      values.push(booster.created.toString());
    }

    const request: string = `UPDATE booster SET ${patterns.join(", ")} WHERE id=?`;
    values.push(booster.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id:number):Promise<void>{
    const request: string = `DELETE FROM booster WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<Booster[]>{
    const request: string = `SELECT * FROM booster`;
    const rows = await (await this.db).all(request);
    
    return rows.map(row => new Booster(
      row.id,
      row.seed,
      new BoosterModel(row.id_boostermodel),
      new User(row.id_user),
      row.obtened,
      row.created
    ));
  }

  async findById(id:number):Promise<Booster|undefined>{
    const request: string = `SELECT * FROM booster WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new Booster(
      row.id,
      row.seed,
      new BoosterModel(row.id_boostermodel),
      new User(row.id_user),
      row.obtened,
      row.created
    ) : undefined;
  }

  async findByUser(userId: number): Promise<Booster[]> {
    const request: string = `SELECT * FROM booster WHERE id_user = ?`;
    const pattern: string[] = [userId.toString()];

    const rows = await (await this.db).all(request, pattern);
    return rows.map(row => new Booster(
      row.id,
      row.seed,
      new BoosterModel(row.id_boostermodel),
      new User(row.id_user),
      row.obtened,
      row.created
    ));
  }
}
```

## File: src/DAO/Sqlite/CardHistSqliteDAO.ts
```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardHist } from "../../Models/CardHist";
import { CardHistDAO } from "../CardHistDAO";
import { Card } from "../../Models/Card";
import { User } from "../../Models/User";

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
		const request: string = `SELECT * FROM cardHist`;
		const rows = await (await this.db).all(request);

		return rows.map(row => new CardHist(
			row.id,
			new Card(row.id_card),
			new User(row.id_user),
			row.obtened
		));
	}

	async findById(id:number):Promise<CardHist|undefined>{
		const request: string = `SELECT * FROM cardHist WHERE id = ?`;
		const values: string[] = [id.toString()];

		const row = await (await this.db).get(request, values);
		return row ? new CardHist(
			row.id,
			new Card(row.id_card),
			new User(row.id_user),
			row.obtened
		) : undefined;
	}

	async findByCard(cardId:number):Promise<CardHist[]>{
		const request: string = `SELECT * FROM cardHist WHERE id_card = ?`;
		const values: string[] = [cardId.toString()];

		const rows = await (await this.db).all(request, values);
		return rows.map(row => new CardHist(
			row.id,
			new Card(row.id_card),
			new User(row.id_user),
			row.obtened
		));
	}

	async findByUser(userId:number):Promise<CardHist[]>{
		const request: string = `SELECT * FROM cardHist WHERE id_user = ?`;
		const values: string[] = [userId.toString()];

		const rows = await (await this.db).all(request, values);
		return rows.map(row => new CardHist(
			row.id,
			new Card(row.id_card),
			new User(row.id_user),
			row.obtened
		));
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
		const patterns: string[] = ["name", "category"];
		const values: string[] = [cardModel.name,cardModel.category];

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
		if (cardModel.category != null) {
			patterns.push("category=?");
			values.push(cardModel.category);
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
		const request: string = `SELECT * FROM cardModel`;
		const rows = await (await this.db).all(request);

		return rows.map(row => new CardModel(
			row.id,
			row.name,
			row.image,
			row.category,
			row.description,
			row.effect
		));
	}

	async findById(id:number):Promise<CardModel|undefined>{
		const request: string = `SELECT * FROM cardModel WHERE id = ?`;
		const values: string[] = [id.toString()];

		const row = await (await this.db).get(request, values);
		return row ? new CardModel(
			row.id,
			row.name,
			row.image,
			row.category,
			row.description,
			row.effect
		) : undefined;
	}
}
```

## File: src/DAO/Sqlite/CardSqliteDAO.ts
```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Card } from "../../Models/Card";
import { CardDAO } from "../CardDAO";
import { User } from "../../Models/User";
import { CardModel } from "../../Models/CardModel";
import { Rarity } from "../../Models/Rarity";

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

		const rows = await (await this.db).all(request);

		return rows.map(row => new Card(
			row.id,
			new User(row.id_user),
			new CardModel(row.id_cardmodel),
			new Rarity(row.id_rarity),
			row.obtened,
			row.created
		));
	}

	async findById(id:number):Promise<Card|undefined>{
		const request:string = `SELECT * FROM card WHERE id = ?`;
		const values:string[] = [
			id.toString()
		];

		const row = await (await this.db).get(request, values);
		return row ? new Card(
			row.id,
			new User(row.id_user),
			new CardModel(row.id_cardmodel),
			new Rarity(row.id_rarity),
			row.obtened,
			row.created
		) : undefined;
	}

	async findByUser(userId:number):Promise<Card[]>{
		const request:string = `SELECT * FROM card WHERE id_user = ?`;
		const values:string[] = [
			userId.toString()
		];

		const rows = await (await this.db).all(request, values);
		return rows.map(row => new Card(
			row.id,
			new User(row.id_user),
			new CardModel(row.id_cardmodel),
			new Rarity(row.id_rarity),
			row.obtened,
			row.created
		));
	}

	async findByCardModel(cardId:number):Promise<Card[]>{
		const request:string = `SELECT * FROM card WHERE id_card = ?`;
		const values:string[] = [
			cardId.toString()
		];

		const rows = await (await this.db).all(request, values);
		return rows.map(row => new Card(
			row.id,
			new User(row.id_user),
			new CardModel(row.id_cardmodel),
			new Rarity(row.id_rarity),
			row.obtened,
			row.created
		));
	}

	async findByRarity(rarityId:number):Promise<Card[]>{
		const request:string = `SELECT * FROM card WHERE id_rarity = ?`;
		const values:string[] = [
			rarityId.toString()
		];

		const rows = await (await this.db).all(request, values);
		return rows.map(row => new Card(
			row.id,
			new User(row.id_user),
			new CardModel(row.id_cardmodel),
			new Rarity(row.id_rarity),
			row.obtened,
			row.created
		));
	}
}
```

## File: src/DAO/Sqlite/CardTradeSqliteDAO.ts
```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CardTrade } from "../../Models/CardTrade";
import { CardTradeDAO } from "../CardTradeDAO";
import { Trade } from "../../Models/Trade";
import { Card } from "../../Models/Card";
import { User } from "../../Models/User";

export class CardTradeSqliteDAO implements CardTradeDAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(cardTrade: CardTrade): Promise<void> {
    const request: string = `INSERT INTO cardTrade(id_trade, id_card, id_owner) VALUES (?, ?, ?)`;
    const pattern: string[] = [
      cardTrade.trade.id.toString(),
      cardTrade.card.id.toString(),
      cardTrade.owner.id.toString()
    ];

    (await this.db).run(request, pattern);
  }

  async update(cardTrade: CardTrade): Promise<void> {
    console.log("No modification for CardTrade");
    return;
  }

  async delete(tradeId: number, cardId: number): Promise<void> {
    const request: string = `DELETE FROM cardTrade WHERE id_trade = ? AND id_card = ?`;
    const pattern: string[] = [tradeId.toString(), cardId.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll(): Promise<CardTrade[]> {
    const request: string = `SELECT * FROM cardTrade`;
    const rows = await (await this.db).all(request);

    return rows.map(row => new CardTrade(
      new Trade(row.id_trade),
      new Card(row.id_card),
      new User(row.id_owner)
    ));
  }

  async findByTrade(tradeId: number): Promise<CardTrade[]> {
    const request: string = `SELECT * FROM cardTrade WHERE id_trade = ?`;
    const pattern: string[] = [tradeId.toString()];

    const rows = await (await this.db).all(request, pattern);
    return rows.map(row => new CardTrade(
      new Trade(row.id_trade),
      new Card(row.id_card),
      new User(row.id_owner)
    ));
  }

  async findByCard(cardId: number): Promise<CardTrade | undefined> {
    const request: string = `SELECT * FROM cardTrade WHERE id_card = ?`;
    const pattern: string[] = [cardId.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new CardTrade(
      new Trade(row.id_trade),
      new Card(row.id_card),
      new User(row.id_owner)
    ) : undefined;
  }
}
```

## File: src/DAO/Sqlite/FactorySqliteDAO.ts
```typescript
import { BoosterDropRateSqliteDAO } from "./BoosterDropRateSqliteDAO";
import { BoosterModelSqliteDAO } from "./BoosterModelSqliteDAO";
import { BoosterSqliteDAO } from "./BoosterSqliteDAO";
import { CardHistSqliteDAO } from "./CardHistSqliteDAO";
import { CardModelSqliteDAO } from "./CardModelSqliteDAO";
import { CardSqliteDAO } from "./CardSqliteDAO";
import { CardTradeSqliteDAO } from "./CardTradeSqliteDAO";
import { RaritySqliteDAO } from "./RaritySqliteDAO";
import { RefreshTokenSqliteDAO } from "./RefreshTokenSqliteDAO";
import { TradeSqliteDAO } from "./TradeSqliteDAO";
import { UserSqliteDAO } from "./UserSqliteDAO";

import { FactoryDAO } from "../FactoryDAO";

import { BoosterDropRateDAO } from "../BoosterDropRateDAO";
import { BoosterModelDAO } from "../BoosterModelDAO";
import { BoosterDAO } from "../BoosterDAO";
import { CardHistDAO } from "../CardHistDAO";
import { CardModelDAO } from "../CardModelDAO";
import { CardDAO } from "../CardDAO";
import { CardTradeDAO } from "../CardTradeDAO";
import { RarityDAO } from "../RarityDAO";
import { RefreshTokenDAO } from "../RefreshTokenDAO";
import { TradeDAO } from "../TradeDAO";
import { UserDAO } from "../UserDAO";

export class FactorySqliteDAO extends FactoryDAO{
    private path:string;

    constructor(_path:string){
        super();
        this.path = _path;
    }

    createBoosterDropRateDAO():BoosterDropRateDAO{
        return new BoosterDropRateSqliteDAO(this.path);
    }

    createBoosterModelDAO():BoosterModelDAO{
        return new BoosterModelSqliteDAO(this.path);
    }

    createBoosterDAO():BoosterDAO{
        return new BoosterSqliteDAO(this.path);
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

    createCardTradeDAO():CardTradeDAO{
        return new CardTradeSqliteDAO(this.path);
    }

    createRarityDAO():RarityDAO{
        return new RaritySqliteDAO(this.path);
    }

    createRefreshTokenDAO():RefreshTokenDAO{
        return new RefreshTokenSqliteDAO(this.path);
    }

    createTradeDAO():TradeDAO{
        return new TradeSqliteDAO(this.path);
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
```

## File: src/DAO/Sqlite/RefreshTokenSqliteDAO.ts
```typescript
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
```

## File: src/DAO/Sqlite/TradeSqliteDAO.ts
```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { Trade } from "../../Models/Trade";
import { TradeDAO } from "../TradeDAO";
import { User } from "../../Models/User";

export class TradeSqliteDAO implements TradeDAO {
  private db: Promise<Database>;

  constructor(dbFilePath: string) {
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(trade: Trade): Promise<void> {
    const patterns: string[] = ["id_sender", "id_receiver", "status", "created"];
    const values: string[] = [
      trade.sender.id.toString(),
      trade.receiver.id.toString(),
      trade.status,
      trade.created.toString(),
    ];

    if (trade.updated != null) {
      patterns.push("updated");
      values.push(trade.updated.toString());
    }

    const request: string = `INSERT INTO trade(${patterns.join(",")}) VALUES (${Array(values.length).fill("?").join(",")})`;

    (await this.db).run(request, values);
  }

  async update(trade: Trade): Promise<void> {
    const patterns: string[] = [];
    const values: string[] = [];

    if (trade.sender != null) {
      patterns.push("id_sender=?");
      values.push(trade.sender.id.toString());
    }
    if (trade.receiver != null) {
      patterns.push("id_receiver=?");
      values.push(trade.receiver.id.toString());
    }
    if (trade.status != null) {
      patterns.push("status=?");
      values.push(trade.status);
    }
    if (trade.created != null) {
      patterns.push("created=?");
      values.push(trade.created.toString());
    }
    if (trade.updated != null) {
      patterns.push("updated=?");
      values.push(trade.updated.toString());
    }

    const request: string = `UPDATE trade SET ${patterns.join(", ")} WHERE id=?`;
    values.push(trade.id.toString());

    (await this.db).run(request, values);
  }

  async delete(id: number): Promise<void> {
    const request: string = `DELETE FROM trade WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    (await this.db).run(request, pattern);
  }

  async findAll(): Promise<Trade[]> {
    const request: string = `SELECT * FROM trade`;
    const rows = await (await this.db).all(request);

    return rows.map(row => new Trade(
      row.id,
      new User(row.id_sender),
      new User(row.id_receiver),
      row.status,
      row.created,
      row.updated
    ));
  }

  async findById(id: number): Promise<Trade | undefined> {
    const request: string = `SELECT * FROM trade WHERE id = ?`;
    const pattern: string[] = [id.toString()];

    const row = await (await this.db).get(request, pattern);
    return row ? new Trade(
      row.id,
      new User(row.id_sender),
      new User(row.id_receiver),
      row.status,
      row.created,
      row.updated
    ) : undefined;
  }

  async findByUser(userId: number): Promise<Trade[]> {
    const request: string = `SELECT * FROM trade WHERE id_sender = ? OR id_receiver = ?`;
    const pattern: string[] = [userId.toString(), userId.toString()];

    const rows = await (await this.db).all(request, pattern);
    return rows.map(row => new Trade(
      row.id,
      new User(row.id_sender),
      new User(row.id_receiver),
      row.status,
      row.created,
      row.updated
    ));
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
	private db: Promise<Database>;

	constructor(dbFilePath: string) {
		this.db = open({
			filename: dbFilePath,
			driver: sqlite3.Database
		});
	}

	async insert(user: User): Promise<void> {
		const request: string = `INSERT INTO user(name,email,password,role,creation) VALUES (?,?,?,?,?)`;
		const values: string[] = [
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

		if (user.name != null) {
			patterns.push("name=?");
			values.push(user.name);
		}
		if (user.email != null) {
			patterns.push("email=?");
			values.push(user.email);
		}
		if (user.password != null) {
			patterns.push("password=?");
			values.push(user.password);
		}
		if (user.role != null) {
			patterns.push("role=?");
			values.push(user.role);
		}
		if (user.create != null) {
			patterns.push("creation=?");
			values.push(user.create.toString());
		}

		const request: string = `UPDATE user SET ${patterns.join(", ")} WHERE id=?`;
		values.push(user.id.toString());

		(await this.db).run(request, values);
	}

	async delete(id: number): Promise<void> {
		const request: string = `DELETE FROM user WHERE id = ?`;
		const values: string[] = [id.toString()];

		(await this.db).run(request, values);
	}

	async findAll(): Promise<User[]> {
		const request: string = `SELECT * FROM user`;
		const rows = await (await this.db).all(request);

		return rows.map(row => new User(
			row.id,
			row.name,
			row.discord_id,
			row.email,
			row.password,
			row.role,
			row.creation
		));
	}

	async findById(id: number): Promise<User | undefined> {
		const request: string = `SELECT * FROM user WHERE id = ?`;
		const values: string[] = [id.toString()];

		const row = await (await this.db).get(request, values);
		return row ? new User(
			row.id,
			row.name,
			row.discord_id,
			row.email,
			row.password,
			row.role,
			row.creation
		) : undefined;
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const request: string = `SELECT * FROM user WHERE email = ?`;
		const values: string[] = [email];

		const row = await (await this.db).get(request, values);
		return row ? new User(
			row.id,
			row.name,
			row.discord_id,
			row.email,
			row.password,
			row.role,
			row.creation
		) : undefined;
	}
}
```

## File: src/DAO/BoosterDAO.ts
```typescript
import { Booster } from "../Models/Booster";

export interface BoosterDAO {
    insert(booster: Booster): Promise<void>;
    update(booster: Booster): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Booster[]>;
    findById(id: number): Promise<Booster | undefined>;
    findByUser(userId: number): Promise<Booster[]>;
}
```

## File: src/DAO/BoosterDropRateDAO.ts
```typescript
import { BoosterDropRate } from "../Models/BoosterDropRate";

export interface BoosterDropRateDAO {
    insert(boosterDropRate: BoosterDropRate): Promise<void>;
    update(boosterDropRate: BoosterDropRate): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<BoosterDropRate[]>;
    findById(id: number): Promise<BoosterDropRate | undefined>;
    findByBoosterModel(boosterModelId: number): Promise<BoosterDropRate[]>;
}
```

## File: src/DAO/BoosterModelDAO.ts
```typescript
import { BoosterModel } from "../Models/BoosterModel";

export interface BoosterModelDAO {
    insert(boosterModel: BoosterModel): Promise<void>;
    update(boosterModel: BoosterModel): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<BoosterModel[]>;
    findById(id: number): Promise<BoosterModel | undefined>;
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

## File: src/DAO/CardTradeDAO.ts
```typescript
import { CardTrade } from "../Models/CardTrade";

export interface CardTradeDAO {
    insert(tradeItem: CardTrade): Promise<void>;
    update(tradeItem: CardTrade): Promise<void>;
    delete(tradeId: number, cardId: number): Promise<void>;
    findAll(): Promise<CardTrade[]>;
    findByTrade(tradeId: number): Promise<CardTrade[]>;
    findByCard(cardId: number): Promise<CardTrade | undefined>;
}
```

## File: src/DAO/FactoryDAO.ts
```typescript
import { BoosterDAO } from "./BoosterDAO";
import { BoosterDropRateDAO } from "./BoosterDropRateDAO";
import { BoosterModelDAO } from "./BoosterModelDAO";
import { CardDAO } from "./CardDAO";
import { CardHistDAO } from "./CardHistDAO";
import { CardModelDAO } from "./CardModelDAO";
import { CardTradeDAO } from "./CardTradeDAO";
import { RarityDAO } from "./RarityDAO";
import { RefreshTokenDAO } from "./RefreshTokenDAO";
import { TradeDAO } from "./TradeDAO";
import { UserDAO } from "./UserDAO";

export abstract class FactoryDAO{
    abstract createBoosterDAO():BoosterDAO;
    abstract createBoosterDropRateDAO():BoosterDropRateDAO;
    abstract createBoosterModelDAO():BoosterModelDAO;
    abstract createCardDAO():CardDAO;
    abstract createCardHistDAO():CardHistDAO;
    abstract createCardModelDAO():CardModelDAO;
    abstract createCardTradeDAO():CardTradeDAO;
    abstract createRarityDAO():RarityDAO;
    abstract createRefreshTokenDAO():RefreshTokenDAO;
    abstract createTradeDAO():TradeDAO;
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

## File: src/DAO/RefreshTokenDAO.ts
```typescript
import { RefreshToken } from "../Models/RefreshToken";

export interface RefreshTokenDAO {
    insert(refreshToken:RefreshToken):Promise<void>;
    update(refreshToken:RefreshToken):Promise<void>;
    delete(id:Number):Promise<void>;
    findAll():Promise<RefreshToken[]>;
    findById(id:number):Promise<RefreshToken|undefined>;
    findByToken(token:string):Promise<RefreshToken|undefined>;
    findByUser(IdUser:number):Promise<RefreshToken[]>;
}
```

## File: src/DAO/TradeDAO.ts
```typescript
import { Trade } from "../Models/Trade";

export interface TradeDAO {
    insert(trade: Trade): Promise<void>;
    update(trade: Trade): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Trade[]>;
    findById(id: number): Promise<Trade | undefined>;
    findByUser(userId: number): Promise<Trade[]>;
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

## File: src/Middleware/auditMiddleware.ts
```typescript
import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import * as path from "path";

interface AuditLog {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  durationMs: number;
  request: any;
  response: any;
}

export function audit(req:Request, res:Response, next:NextFunction){
  const start = Date.now();
  const requestBody = JSON.parse(JSON.stringify(req.body || {}));
  const originalSend = res.send;
  let responseBody: any;  

  res.send = function (body:any){
    responseBody = body;
    return originalSend.call(this,body);
  };

  res.on("finish", () => {
    const end = Date.now();
    const durationMs = Number(end-start) / 1_000_000;

    const auditLog:AuditLog = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      request: {
        headers: maskSensitiveInfo(req.headers),
        body: maskSensitiveInfo(requestBody),
        params: req.params,
        query: req.query,
      },
      response: {
        body: (req.originalUrl!="/auth/login" ? maskSensitiveInfo(responseBody): "[REDACTED]"),
      },
      durationMs,
      timestamp: new Date().toISOString(),
    };

    log(auditLog);
  });

  next();
}

async function log(auditLog:AuditLog){
  if (!process.env.LogDir) throw new Error("Missing LogDir");
  const date = new Date();

  const dirYear = path.join(process.env.LogDir, date.getFullYear().toString());
  const dirMonth = path.join(dirYear, (date.getMonth() + 1).toString().padStart(2, "0"));
  const fileDay = path.join(dirMonth, `${date.getDate().toString().padStart(2, "0")}.jsonl`);

  await fs.mkdir(dirYear, { recursive: true });
  await fs.mkdir(dirMonth, { recursive: true });

  const line = JSON.stringify(auditLog) + "\n";
  await fs.appendFile(fileDay, line, { encoding: "utf8" });
}

function maskSensitiveInfo(obj:any){
    if (!obj || typeof obj !== 'object') return obj;
    const clone = Array.isArray(obj) ? [...obj] : { ...obj };
    for (const key of Object.keys(clone)) {
      if(["password", "token", "accessToken", "refreshToken", "authorization"].includes(key)){
        clone[key] = "[REDACTED]";
      }else if(typeof clone[key] === 'object' && clone[key] !== null){
        clone[key] = maskSensitiveInfo(clone[key]);
      }else if(typeof clone[key] === 'string' && clone[key] !== null){
        try {
          const parsed = JSON.parse(clone[key]);
          clone[key] = maskSensitiveInfo(parsed);
        } catch {}
      }
    }
    return clone;
  }
```

## File: src/Middleware/authMiddleware.ts
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
    /*const decoded = jwt.decode(token) as (JwtPayload & { sub?: string; role?: string }) | null;
    if (decoded) {
      const exp = decoded.exp;
      console.log('Decoded token exp:', exp, '->', exp ? new Date(exp * 1000).toISOString() : 'no-exp');
      console.log('Decoded token payload:', { sub: decoded.sub, role: decoded.role });
    } else {
      console.log('Could not decode token (may be malformed)');
    }*/

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { sub:string; role:string; };
    req.user = {
      sub: payload.sub,
      role: payload.role
    };
    next();
  } catch(error:any){
    res.status(401).send("Invalid token: " + error.message);
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

## File: src/Models/Booster.ts
```typescript
import { BoosterModel } from "./BoosterModel";
import { User } from "./User";

export class Booster {
    private _id: number;
    private _seed: number;
    private _boosterModel: BoosterModel;
    private _user: User;
    private _obtened: number;
    private _created: number;

    constructor(id: number = 0, seed: number = 0, boosterModel: BoosterModel = new BoosterModel(), user: User = new User(), obtened: number = Date.now(), created: number = Date.now()) {
        this._id = id;
        this._seed = seed;
        this._boosterModel = boosterModel;
        this._user = user;
        this._obtened = obtened;
        this._created = created;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Seed
    public get seed(): number {
        return this._seed;
    }
    public set seed(seed: number) {
        this._seed = seed;
    }

    // BoosterModel
    public get boosterModel(): BoosterModel {
        return this._boosterModel;
    }
    public set boosterModel(boosterModel: BoosterModel) {
        this._boosterModel = boosterModel;
    }

    // User
    public get user(): User {
        return this._user;
    }
    public set user(user: User) {
        this._user = user;
    }

    // Obtened
    public get obtened(): number {
        return this._obtened;
    }
    public set obtened(obtened: number) {
        this._obtened = obtened;
    }

    // Created
    public get created(): number {
        return this._created;
    }
    public set created(created: number) {
        this._created = created;
    }
}
```

## File: src/Models/BoosterDropRate.ts
```typescript
import { BoosterModel } from "./BoosterModel";
import { Rarity } from "./Rarity";

export class BoosterDropRate {
    private _id: number;
    private _rarity: Rarity;
    private _boosterModel: BoosterModel;
    private _guarantee: number;
    private _dropRate: number;

    constructor(id: number = 0, rarity: Rarity = new Rarity(), boosterModel: BoosterModel = new BoosterModel(), guarantee: number = 0, dropRate: number = 0.2) {
        this._id = id;
        this._rarity = rarity;
        this._boosterModel = boosterModel;
        this._guarantee = guarantee;
        this._dropRate = dropRate;
    }
    
    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Rarity
    public get rarity(): Rarity {
        return this._rarity;
    }
    public set rarity(rarity: Rarity) {
        this._rarity = rarity;
    }

    // BoosterModel
    public get boosterModel(): BoosterModel {
        return this._boosterModel;
    }
    public set boosterModel(boosterModel: BoosterModel) {
        this._boosterModel = boosterModel;
    }

    // Guarantee
    public get guarantee(): number {
        return this._guarantee;
    }
    public set guarantee(guarantee: number) {
        this._guarantee = guarantee;
    }

    // DropRate
    public get dropRate(): number {
        return this._dropRate;
    }
    public set dropRate(dropRate: number) {
        this._dropRate = dropRate;
    }
}
```

## File: src/Models/BoosterModel.ts
```typescript
export class BoosterModel {
    private _id: number;
    private _name: string;
    private _nmbCard: number;
    private _category: string;

    constructor(id: number = 0, name: string = "", nmbCard: number = 1, category: string = "[]") {
        this._id = id;
        this._name = name;
        this._nmbCard = nmbCard;
        this._category = category;
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

    // NmbCard
    public get nmbCard(): number {
        return this._nmbCard;
    }
    public set nmbCard(nmbCard: number) {
        this._nmbCard = nmbCard;
    }

    // Category
    public get category(): string {
        return this._category;
    }
    public set category(category: string) {
        this._category = category;
    }
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
    private _category: string;
    private _description: string;
    private _effect: string;

    constructor(id:number = 0, name:string ="", image:string = "", category:string = "", description:string = "", effect:string = "") {
        this._id = id;
        this._name = name;
        this._image = image;
        this._category = category;
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

    // Category
    public get category(): string {
        return this._category;
    }
    public set category(category: string) {
        this._category = category;
    }
}
```

## File: src/Models/CardTrade.ts
```typescript
import { Card } from "./Card";
import { Trade } from "./Trade";
import { User } from "./User";

export class CardTrade {
    private _trade:Trade;
    private _card:Card;
    private _owner:User;

    constructor(trade:Trade = new Trade(), card:Card = new Card(), owner:User = new User()) {
        this._trade = trade;
        this._card = card;
        this._owner = owner;
    }

    // Trade
    public get trade(): Trade {
        return this._trade;
    }
    public set trade(trade: Trade) {
        this._trade = trade;
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

## File: src/Models/RefreshToken.ts
```typescript
import { User } from "./User";

export class RefreshToken {
    private _id:number;
    private _tokenHash:string;
    private _user:User;
    private _expirationDate:number;
    private _revoked:boolean

    constructor(id:number = 0, tokenHash:string = "",user:User = new User(),expirationDate:number = 0, revoked:boolean = true) {
        this._id = id;
        this._tokenHash = tokenHash;
        this._user = user;
        this._expirationDate = expirationDate;
        this._revoked = revoked;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // TokenHash
    public get tokenHash(): string {
        return this._tokenHash;
    }

    public set tokenHash(tokenHash: string) {
        this._tokenHash = tokenHash;
    }

    // User
    public get user(): User {
        return this._user;
    }

    public set user(user: User) {
        this._user = user;
    }

    // ExpirationDate
    public get expirationDate(): number {
        return this._expirationDate;
    }

    public set expirationDate(expirationDate: number) {
        this._expirationDate = expirationDate;
    }

    // Revoked
    public get revoked(): boolean {
        return this._revoked;
    }

    public set revoked(revoked: boolean) {
        this._revoked = revoked;
    }
}
```

## File: src/Models/Trade.ts
```typescript
import { User } from "./User";

export class Trade {
    private _id: number;
    private _sender:User;
    private _receiver:User;
    private _status:string;
    private _created:number;
    private _updated: number|null;

    constructor(id: number = 0, sender:User = new User(), receiver:User = new User(), status: string = "PENDING", created:number = Date.now(), updated: number|null = null) {
        this._id = id;
        this._sender = sender;
        this._receiver = receiver;
        this._status = status;
        this._created = created;
        this._updated = updated;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Sender
    public get sender(): User {
        return this._sender;
    }
    public set sender(sender: User) {
        this._sender = sender;
    }

    // Receiver
    public get receiver(): User {
        return this._receiver;
    }
    public set receiver(receiver: User) {
        this._receiver = receiver;
    }

    // Status
    public get status(): string {
        return this._status;
    }
    public set status(status: string) {
        this._status = status;
    }

    // Created
    public get created(): number {
        return this._created;
    }
    public set created(created: number) {
        this._created = created;
    }

    // Updated
    public get updated(): number | null {
        return this._updated;
    }
    public set updated(updated: number | null) {
        this._updated = updated;
    }
}
```

## File: src/Models/User.ts
```typescript
export class User {
    private _id: number;
    private _name: string;
    private _discordId: string;
    private _email: string;
    private _password: string;
    private _role: string;
    private _create: number;

    constructor(id:number = 0, name:string = "", discordId:string = "", email:string = "", password:string = "", role:string = "USER", create:number = Date.now()){   
        this._id = id;
        this._name = name;
        this._discordId = discordId;
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

    // DiscordUsername
    public get discordId(): string {
        return this._discordId;
    }
    public set discordId(discordId: string) {
        this._discordId = discordId;
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

import { RefreshTokenDAO } from "../DAO/RefreshTokenDAO";

export function authRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const userDAO = factoryDAO.createUserDAO();
    const refreshTokenDAO = factoryDAO.createRefreshTokenDAO();
    const authService = new AuthService(userDAO, refreshTokenDAO);
    const authController = new AuthController(authService);

    router.post("/login", authController.login.bind(authController));
    router.post("/register", authController.register.bind(authController));
    router.post("/refresh", authController.refresh.bind(authController));

    return router;
}
```

## File: src/Routes/BoosterDropRateRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { BoosterDropRateDAO } from "../DAO/BoosterDropRateDAO";
import { BoosterDropRateService } from "../Services/BoosterDropRateService";
import { BoosterDropRateController } from "../Controllers/BoosterDropRateController";

export function boosterDropRateRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const boosterDropRateDAO = factoryDAO.createBoosterDropRateDAO();
    const boosterDropRateService = new BoosterDropRateService(boosterDropRateDAO);
    const boosterDropRateController = new BoosterDropRateController(boosterDropRateService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), boosterDropRateController.getAll.bind(boosterDropRateController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), boosterDropRateController.get.bind(boosterDropRateController));
    router.post("/", authJWT, requireRole(["ADMIN"]), boosterDropRateController.create.bind(boosterDropRateController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), boosterDropRateController.delete.bind(boosterDropRateController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), boosterDropRateController.update.bind(boosterDropRateController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), boosterDropRateController.update.bind(boosterDropRateController));

    return router;
}
```

## File: src/Routes/BoosterModelRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { BoosterModelDAO } from "../DAO/BoosterModelDAO";
import { BoosterModelService } from "../Services/BoosterModelService";
import { BoosterModelController } from "../Controllers/BoosterModelController";

export function boosterModelRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const boosterModelDAO = factoryDAO.createBoosterModelDAO();
    const boosterModelService = new BoosterModelService(boosterModelDAO);
    const boosterModelController = new BoosterModelController(boosterModelService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), boosterModelController.getAll.bind(boosterModelController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), boosterModelController.get.bind(boosterModelController));
    router.post("/", authJWT, requireRole(["ADMIN"]), boosterModelController.create.bind(boosterModelController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), boosterModelController.delete.bind(boosterModelController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), boosterModelController.update.bind(boosterModelController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), boosterModelController.update.bind(boosterModelController));

    return router;
}
```

## File: src/Routes/BoosterRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { BoosterDAO } from "../DAO/BoosterDAO";
import { BoosterService } from "../Services/BoosterService";
import { BoosterController } from "../Controllers/BoosterController";

export function boosterRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const boosterDAO = factoryDAO.createBoosterDAO();
    const boosterService = new BoosterService(boosterDAO);
    const boosterController = new BoosterController(boosterService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), boosterController.getAll.bind(boosterController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), boosterController.get.bind(boosterController));
    router.post("/", authJWT, requireRole(["ADMIN"]), boosterController.create.bind(boosterController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), boosterController.delete.bind(boosterController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), boosterController.update.bind(boosterController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), boosterController.update.bind(boosterController));

    return router;
}
```

## File: src/Routes/CardHistRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware"

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
import { authJWT, requireRole } from "../Middleware/authMiddleware"

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
import { authJWT, requireRole } from "../Middleware/authMiddleware"

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
import { authJWT, requireRole } from "../Middleware/authMiddleware"

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

## File: src/Routes/TradeRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { TradeDAO } from "../DAO/TradeDAO";
import { TradeService } from "../Services/TradeService";
import { TradeController } from "../Controllers/TradeController";

export function tradeRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const tradeDAO = factoryDAO.createTradeDAO();
    const tradeService = new TradeService(tradeDAO);
    const tradeController = new TradeController(tradeService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), tradeController.getAll.bind(tradeController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), tradeController.get.bind(tradeController));
    router.post("/", authJWT, requireRole(["ADMIN"]), tradeController.create.bind(tradeController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), tradeController.delete.bind(tradeController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), tradeController.update.bind(tradeController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), tradeController.update.bind(tradeController));

    return router;
}
```

## File: src/Routes/UserRoutes.ts
```typescript
import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware"

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
import { RefreshTokenDAO } from "../DAO/RefreshTokenDAO";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { User } from "../Models/User";
import { RefreshToken } from "../Models/RefreshToken";
import { exit } from "node:process";

const SALT_ROUNDS = 12;

export class AuthService {
    constructor(private userDAO: UserDAO, private refreshTokenDAO:RefreshTokenDAO){}

    async login(email:string, password:string):Promise<string[]> {
        const user = await this.userDAO.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password)))
            throw new Error("User incorrect");

        const token:string = crypto.randomBytes(40).toString('hex');
        const newUserRT = new RefreshToken();
        newUserRT.tokenHash = await bcrypt.hash(token, SALT_ROUNDS);
        newUserRT.user = new User(user.id);
        newUserRT.expirationDate = Date.now() + (24 * 60 * 60 * 1000);
        newUserRT.revoked = false;
        this.refreshTokenDAO.insert(newUserRT);
        return [jwt.sign({sub: user.id,role: user.role},process.env.JWT_SECRET!,{ expiresIn: "1h" }),token];
    }

	async register(user:User){
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
		user.role = "USER";
        user.create = Date.now();
		this.userDAO.insert(user);
	}

    async refresh(refreshToken:string):Promise<string[]> {
        const userRefreshTokens:RefreshToken[] = await this.refreshTokenDAO.findAll();
        let userRefreshToken:RefreshToken|null = null;
        for (const userRT of userRefreshTokens) {
            if(await bcrypt.compare(refreshToken, userRT.tokenHash)){
                userRefreshToken = userRT;
                break;
            }
        }
        if(userRefreshToken == null)
            throw new Error("No refreshToken");
        if(userRefreshToken.expirationDate < Date.now() || userRefreshToken.revoked)
            throw new Error("refresh token experied");

        const user = await this.userDAO.findById(userRefreshToken.user.id);
        if(user==null) throw new Error("No User");
        const token:string = crypto.randomBytes(40).toString('hex');

        const newUserRT = new RefreshToken();
        newUserRT.tokenHash = await bcrypt.hash(token, SALT_ROUNDS);
        newUserRT.user = new User(user.id);
        newUserRT.expirationDate = Date.now() + (24 * 60 * 60 * 1000);
        newUserRT.revoked = false;
        this.refreshTokenDAO.insert(newUserRT);

        userRefreshToken.revoked = true;
        this.refreshTokenDAO.update(userRefreshToken);

        return [jwt.sign({sub: user.id,role: user.role},process.env.JWT_SECRET!,{ expiresIn: "1h" }),token];
    }
}
```

## File: src/Services/BoosterDropRateService.ts
```typescript
import { BoosterDropRate } from "../Models/BoosterDropRate";
import { BoosterDropRateDAO } from "../DAO/BoosterDropRateDAO";

export class BoosterDropRateService {
    constructor(private boosterDropRateDAO: BoosterDropRateDAO){}

    async getAll(limit:number, page:number):Promise<BoosterDropRate[]>{
        var boosterDropRates:BoosterDropRate[] = await this.boosterDropRateDAO.findAll();
        boosterDropRates = boosterDropRates.slice((page-1)*limit, page*limit);
        return boosterDropRates;
    }

    async get(id: number):Promise<BoosterDropRate>{
        const boosterDropRate = await this.boosterDropRateDAO.findById(id);
        if(!boosterDropRate){
            throw new Error("BoosterDropRate not found");
        }
        return boosterDropRate;
    }

    async create(boosterDropRate:BoosterDropRate):Promise<void>{
        
        this.boosterDropRateDAO.insert(boosterDropRate);
    }

    async delete(id:number):Promise<void>{
        await this.boosterDropRateDAO.delete(id);
    }

    async update(data:BoosterDropRate):Promise<void>{
        await this.boosterDropRateDAO.update(data);
    }
}
```

## File: src/Services/BoosterModelService.ts
```typescript
import { BoosterModel } from "../Models/BoosterModel";
import { BoosterModelDAO } from "../DAO/BoosterModelDAO";

export class BoosterModelService {
    constructor(private boosterModelDAO: BoosterModelDAO){}

    async getAll(limit:number, page:number):Promise<BoosterModel[]>{
        var boosterModels:BoosterModel[] = await this.boosterModelDAO.findAll();
        boosterModels = boosterModels.slice((page-1)*limit, page*limit);
        return boosterModels;
    }

    async get(id: number):Promise<BoosterModel>{
        const boosterModel = await this.boosterModelDAO.findById(id);
        if(!boosterModel){
            throw new Error("BoosterModel not found");
        }
        return boosterModel;
    }

    async create(boosterModel:BoosterModel):Promise<void>{
        
        this.boosterModelDAO.insert(boosterModel);
    }

    async delete(id:number):Promise<void>{
        await this.boosterModelDAO.delete(id);
    }

    async update(data:BoosterModel):Promise<void>{
        await this.boosterModelDAO.update(data);
    }
}
```

## File: src/Services/BoosterService.ts
```typescript
import { Booster } from "../Models/Booster";
import { BoosterDAO } from "../DAO/BoosterDAO";

export class BoosterService {
    constructor(private boosterDAO: BoosterDAO){}

    async getAll(limit:number, page:number):Promise<Booster[]>{
        var boosters:Booster[] = await this.boosterDAO.findAll();
        boosters = boosters.slice((page-1)*limit, page*limit);
        return boosters;
    }

    async get(id: number):Promise<Booster>{
        const booster = await this.boosterDAO.findById(id);
        if(!booster){
            throw new Error("Booster not found");
        }
        return booster;
    }

    async create(booster:Booster):Promise<void>{
        
        this.boosterDAO.insert(booster);
    }

    async delete(id:number):Promise<void>{
        await this.boosterDAO.delete(id);
    }

    async update(data:Booster):Promise<void>{
        await this.boosterDAO.update(data);
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

## File: src/Services/RefreshTokenService.ts
```typescript
import { RefreshToken } from "../Models/RefreshToken";
import { RefreshTokenDAO } from "../DAO/RefreshTokenDAO";

export class RefreshTokenService {
    constructor(private refreshTokenDAO: RefreshTokenDAO){}

    async getAll(limit:number, page:number):Promise<RefreshToken[]>{
        var refreshTokens:RefreshToken[] = await this.refreshTokenDAO.findAll();
        refreshTokens = refreshTokens.slice((page-1)*limit, page*limit);
        return refreshTokens;
    }

    async get(id: number):Promise<RefreshToken>{
        const refreshToken = await this.refreshTokenDAO.findById(id);
        if(!refreshToken){
            throw new Error("RefreshToken not found");
        }
        return refreshToken;
    }

    async create(refreshToken:RefreshToken):Promise<void>{
        refreshToken.expirationDate = Date.now() + (24 * 60 * 60 * 1000);
        this.refreshTokenDAO.insert(refreshToken);
    }

    async delete(id:number):Promise<void>{
        await this.refreshTokenDAO.delete(id);
    }

    async update(data:RefreshToken):Promise<void>{
        await this.refreshTokenDAO.update(data);
    }
}
```

## File: src/Services/TradeService.ts
```typescript
import { Trade } from "../Models/Trade";
import { TradeDAO } from "../DAO/TradeDAO";

export class TradeService {
    constructor(private tradeDAO: TradeDAO){}

    async getAll(limit:number, page:number):Promise<Trade[]>{
        var trades:Trade[] = await this.tradeDAO.findAll();
        trades = trades.slice((page-1)*limit, page*limit);
        return trades;
    }

    async get(id: number):Promise<Trade>{
        const trade = await this.tradeDAO.findById(id);
        if(!trade){
            throw new Error("Trade not found");
        }
        return trade;
    }

    async create(trade:Trade):Promise<void>{
        
        this.tradeDAO.insert(trade);
    }

    async delete(id:number):Promise<void>{
        await this.tradeDAO.delete(id);
    }

    async update(data:Trade):Promise<void>{
        await this.tradeDAO.update(data);
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

## File: src/index.ts
```typescript
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();

if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET");
if (!process.env.port) throw new Error("Missing port");
if (!process.env.LogDir) throw new Error("Missing LogDir");
if (!process.env.BDDSqliteDir) throw new Error("Missing BDDSqliteDir");

import { authRoutes } from "./Routes/AuthRoutes";
import { boosterDropRateRoutes } from "./Routes/BoosterDropRateRoutes";
import { boosterModelRoutes } from "./Routes/BoosterModelRoutes";
import { boosterRoutes } from "./Routes/BoosterRoutes";
import { cardHistRoutes } from "./Routes/CardHistRoutes";
import { cardModelRoutes } from "./Routes/CardModelRoutes";
import { cardRoutes } from "./Routes/CardRoutes";
import { rarityRoutes } from "./Routes/RarityRoutes";
import { tradeRoutes } from "./Routes/TradeRoutes";
import { userRoutes } from "./Routes/UserRoutes";

import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

import { audit } from "./Middleware/auditMiddleware";

const app = express();
app.use(express.json());
app.use(audit);
app.use(cookieParser());
const port = process.env.port;

const factoryDAO:FactoryDAO = new FactorySqliteDAO(process.env.BDDSqliteDir);

app.use("/boosterdroprates", boosterDropRateRoutes(factoryDAO));
app.use("/boostermodels", boosterModelRoutes(factoryDAO));
app.use("/boosters", boosterRoutes(factoryDAO));
app.use("/cardhists", cardHistRoutes(factoryDAO));
app.use("/cardmodels", cardModelRoutes(factoryDAO));
app.use("/cards", cardRoutes(factoryDAO));
app.use("/raritys", rarityRoutes(factoryDAO));
app.use("/trades", tradeRoutes(factoryDAO));
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
    discord_id VARCHAR(100) DEFAULT NULL,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(15) NOT NULL CHECK (role IN ('USER', 'ADMIN')) DEFAULT 'USER',
    creation DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS RefreshToken (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token_hash UUID UNIQUE NOT NULL,
    id_user INT NOT NULL,
    expiration_date DATETIME NOT NULL,
    revoked BOOLEAN DEFAULT True,
    CONSTRAINT fk_refreshToken_user FOREIGN KEY (id_user) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INT NOT NULL,
    id_cardmodel INT NOT NULL,
    id_rarity INT NOT NULL,
    obtened DATETIME NOT NULL,
    created DATETIME NOT NULL,
    CONSTRAINT fk_card_user FOREIGN KEY (id_user) REFERENCES User(id),
    CONSTRAINT fk_card_cardmodel FOREIGN KEY (id_cardmodel) REFERENCES CardModel(id),
    CONSTRAINT fk_card_rarity FOREIGN KEY (id_rarity) REFERENCES Rarity(id)
);

CREATE TABLE IF NOT EXISTS CardModel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(100) DEFAULT NULL,
    category TEXT DEFAULT '[]' NOT NULL,
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
    CONSTRAINT fk_cardhist_card FOREIGN KEY (id_card) REFERENCES Card(id),
    CONSTRAINT fk_cardhist_user FOREIGN KEY (id_user) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Booster (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    seed INT NOT NULL,
    id_boostermodel INT NOT NULL,
    id_user INT NOT NULL,
    obtened DATETIME NOT NULL,
    created DATETIME NOT NULL,
    CONSTRAINT fk_booster_user FOREIGN KEY (id_user) REFERENCES User(id),
    CONSTRAINT fk_booster_boostermodel FOREIGN KEY (id_boostermodel) REFERENCES BoosterModel(id)
);

CREATE TABLE IF NOT EXISTS BoosterModel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) DEFAULT 'NO NAME' NOT NULL,
    nmbCard INT DEFAULT 5 NOT NULL,
    category TEXT DEFAULT '[]' NOT NULL
);

CREATE TABLE IF NOT EXISTS BoosterDropRate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_rarity INT NOT NULL,
    id_boostermodel INT NOT NULL,
    guarantee INT DEFAULT 0 NOT NULL,
    drop_rate DECIMAL(5,2) DEFAULT 20,
    CONSTRAINT fk_boosterdroprate_boostermodel FOREIGN KEY (id_boostermodel) REFERENCES BoosterModel(id),
    CONSTRAINT fk_boosterdroprate_rarity FOREIGN KEY (id_rarity) REFERENCES Rarity(id)
);

CREATE TABLE IF NOT EXISTS Trade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_sender INT NOT NULL,
    id_receiver INT NOT NULL,
    status VARCHAR(15) NOT NULL CHECK (status IN ('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED')) DEFAULT 'PENDING',
    created DATETIME NOT NULL,
    updated DATETIME DEFAULT NULL,
    CONSTRAINT fk_trade_user_sender FOREIGN KEY (id_sender) REFERENCES User(id),
    CONSTRAINT fk_trade_user_receiver FOREIGN KEY (id_receiver) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS CardTrade (
    id_trade INT NOT NULL,
    id_card INT NOT NULL,
    id_owner INT NOT NULL,
    PRIMARY KEY (id_trade, id_card),
    CONSTRAINT fk_cardtrade_trade FOREIGN KEY (id_trade) REFERENCES Trade(id),
    CONSTRAINT fk_cardtrade_card FOREIGN KEY (id_card) REFERENCES Card(id),
    CONSTRAINT fk_cardtrade_user FOREIGN KEY (id_owner) REFERENCES User(id)
);
```
