const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node Tools/AddTable.js [NameTable]');
    process.exit(1);
}

const tableName = args[0].charAt(0).toLowerCase() + args[0].slice(1);
const className = tableName.charAt(0).toUpperCase() + tableName.slice(1);
const basePath = path.resolve(__dirname, '../src');

// Templates for the files
const modelTemplate = `
export class ${className} {


    constructor() {
        
    }
}
`;

const DAOTemplate = `
import { ${className} } from "../Models/${className}";

export interface ${className}DAO {
    insert(:${className}):Promise<void>;
    update(:${className}):Promise<void>;
    delete(:${className}):Promise<void>;
    findAll():Promise<${className}[]>;
    findById(id:number):Promise<${className}|undefined>;
}
`;

const SqliteDaoTemplate = `
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { ${className} } from "../../Models/${className}";
import { ${className}DAO } from "../${className}DAO";

export class ${className}SqliteDAO implements ${className}DAO {
  private db:Promise<Database>;

  constructor(dbFilePath: string){
    this.db = open({
      filename: dbFilePath,
      driver: sqlite3.Database
    });
  }

  async insert(${tableName}:${className}):Promise<void>{
    const request:string = \`INSERT INTO ${tableName}() VALUES ()\`;
    const pattern:string[] = [
        
    ];

    (await this.db).run(request, pattern);
  }

  async update(${tableName}:${className}):Promise<void>{
    const request:string = \`UPDATE ${tableName} SET  WHERE id=?\`;
    const pattern:string[] = [

        ${tableName}.getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(${tableName}:${className}):Promise<void>{
    const request:string = \`DELETE FROM ${tableName} WHERE id = ?\`;
    const pattern:string[] = [
        ${tableName}.getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<${className}[]>{
    const request:string = \`SELECT * FROM ${tableName}\`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<${className}|undefined>{
    const request:string = \`SELECT * FROM ${tableName} WHERE id = ?\`;
    const pattern:string[] = [
        id.toString()
    ];

    return (await this.db).get(request, pattern);
  }
}
`;

const ServicesTemplate = `
import { ${className} } from "../Models/${className}";
import { ${className}DAO } from "../DAO/${className}DAO";

export class ${className}Service {
    constructor(private ${tableName}DAO: ${className}DAO){}

    async getAll${className}():Promise<${className}[]>{
        return await this.${tableName}DAO.findAll();
    }

    async get${className}(id: number):Promise<${className}>{
        const ${tableName} = await this.${tableName}DAO.findById(id);
        if(!${tableName}){
            throw new Error("${className} not found");
        }
        return ${tableName};
    }

    async create${className}(${tableName}:${className}):Promise<void>{
        
        this.${tableName}DAO.insert(${tableName});
    }

    async delete${className}(id:number):Promise<void>{
        await this.${tableName}DAO.delete(id);
    }

    async update${className}(data:${className}):Promise<void>{
        await this.${tableName}DAO.update(data);
    }
}
`;

const ControllersTemplate = `
import { Request, Response } from "express";
import { ${className} } from "../Models/${className}";
import { ${className}Service } from "../Services/${className}Service";

export class ${className}Controller{
    constructor(private ${tableName}Service:${className}Service){}

    getAll${className} = async (req:Request, res:Response):Promise<void> => {
        try{
            const limit:number = Number(req.query.limit) || 10;
            const page:number = Number(req.query.page) || 1;
            const ${tableName}s = await this.${tableName}Service.getAll${className}();
            res.json(${tableName}s);
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    get${className} = async (req:Request, res:Response):Promise<void> => {
        try{
            const ${tableName} = await this.${tableName}Service.get${className}(Number(req.params.id));
            res.json(${tableName});
        }catch(error:any){
            res.status(404).json({ error: error.message });
        }
    };

    create${className} = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.${tableName}Service.create${className}(req.body);
            res.json("${className} created");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    delete${className} = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.${tableName}Service.delete${className}(Number(req.params.id));
            res.json("${className} deleted");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };

    update${className} = async (req:Request, res:Response):Promise<void> => {
        try{
            await this.${tableName}Service.update${className}(req.body);
            res.json("${className} updated");
        }catch(error:any){
            res.status(400).json({ error: error.message });
        }
    };
}
`;

const RoutesTemplate = `
import { Router } from "express";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { ${className}DAO } from "../DAO/${className}DAO";
import { ${className}Service } from "../Services/${className}Service";
import { ${className}Controller } from "../Controllers/${className}Controller";

export function ${tableName}Routes(${tableName}DAO:${className}DAO): Router {
    const router = Router();

    const ${tableName}Service = new ${className}Service(${tableName}DAO);
    const ${tableName}Controller = new ${className}Controller(${tableName}Service);

    router.get("/", ${tableName}Controller.getAll${className});
    router.get("/:id", ${tableName}Controller.get${className});
    router.post("/", ${tableName}Controller.create${className});
    router.delete("/0", ${tableName}Controller.delete${className});
    router.put("/", ${tableName}Controller.update${className});
    router.patch("/", ${tableName}Controller.update${className});

    return router;
}
`;

// Create files
const createFile = (filePath, content) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content.trim());
        console.log(`Created: ${filePath}`);
    } else {
        console.log(`Skipped (already exists): ${filePath}`);
    }
};

createFile(path.join(basePath, 'Models', `${className}.ts`), modelTemplate);
createFile(path.join(basePath, 'DAO', `${className}DAO.ts`), DAOTemplate);
createFile(path.join(basePath, 'DAO', 'Sqlite', `${className}SqliteDAO.ts`), SqliteDaoTemplate);

createFile(path.join(basePath, 'Services', `${className}Service.ts`), ServicesTemplate);
createFile(path.join(basePath, 'Controllers', `${className}Controller.ts`), ControllersTemplate);
createFile(path.join(basePath, 'Routes', `${className}Routes.ts`), RoutesTemplate);

// Regenerate FactoryDAO.ts
const regenerateFactoryDAO = () => {
    const daoDir = path.join(basePath, 'DAO');
    const files = fs.readdirSync(daoDir).filter(file => file.endsWith('DAO.ts') && !file.startsWith('Factory'));

    const imports = files.map(file => {
        const name = file.replace('.ts', '');
        return `import { ${name} } from "./${name}";`;
    }).join('\n');

    const methods = files.map(file => {
        const name = file.replace('.ts', '');
        return `    abstract create${name}():${name};`;
    }).join('\n');

    const content = `
${imports}

export abstract class FactoryDAO{
${methods}
}
    `.trim();

    fs.writeFileSync(path.join(daoDir, 'FactoryDAO.ts'), content);
    console.log('Regenerated: FactoryDAO.ts');
};

// Regenerate FactorySqliteDAO.ts
const regenerateFactorySqliteDAO = () => {
    const SqliteDaoDir = path.join(basePath, 'DAO', 'Sqlite');
    const files = fs.readdirSync(SqliteDaoDir).filter(file => file.endsWith('SqliteDAO.ts') && !file.startsWith('Factory'));

    const importSqlite = files.map(file => {
        const name = file.replace('.ts', '');
        return `import { ${name} } from "./${name}";`;
    }).join('\n');

    const imports = files.map(file => {
        const name = file.replace('.ts', '').replace('Sqlite', '');
        return `import { ${name} } from "../${name}";`;
    }).join('\n');

    const methods = files.map(file => {
        const name = file.replace('SqliteDAO.ts', 'DAO');
        const nameSqlite = name.replace('DAO', 'SqliteDAO');
        return `    create${name}():${name}{\n        return new ${nameSqlite}(this.path);\n    }`;
    }).join('\n\n');

    const content = `
${importSqlite}

import { FactoryDAO } from "../FactoryDAO";

${imports}

export class FactorySqliteDAO extends FactoryDAO{
    private path:string;

    constructor(_path:string){
        super();
        this.path = _path;
    }

${methods}
}
    `.trim();

    fs.writeFileSync(path.join(SqliteDaoDir, 'FactorySqliteDAO.ts'), content);
    console.log('Regenerated: FactorySqliteDAO.ts');
};

// Regenerate index.ts
const regenerateIndex = () => {
    const routesDir = path.join(basePath, 'Routes');
    const files = fs.readdirSync(routesDir).filter(file => file.endsWith('.ts'));

    const imports = files.map(file => {
        const name = file.replace('Routes.ts', '');
        return `import { ${name.charAt(0).toLowerCase()+name.slice(1)}Routes } from "./Routes/${name}Routes";`;
    }).join('\n');

    const functions = files.map(file => {
        const name = file.replace('Routes.ts', '');
        return `app.use("/${name.charAt(0).toLowerCase()+name.slice(1)}s", ${name.charAt(0).toLowerCase()+name.slice(1)}Routes(factoryDAO.create${name}DAO()));`;
    }).join('\n');

    const content = `
import express from "express";

${imports}

import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

const app = express()
const port = 3000

const factoryDAO:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');

${functions}

app.listen(port, () => console.log("API running on port " + port));
    `.trim();

    fs.writeFileSync(path.join(basePath, 'index.ts'), content);
    console.log('Regenerated: index.ts');
};

regenerateFactoryDAO();
regenerateFactorySqliteDAO();
regenerateIndex();

console.log('Table addition complete.');