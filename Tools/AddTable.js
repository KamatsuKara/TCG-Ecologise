const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node Tools/AddTable.js [NomDeLaTable]');
    process.exit(1);
}

const tableName = args[0];
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

  async insert(:${className}):Promise<void>{
    const request:string = \`INSERT INTO  () VALUES ()\`;
    const pattern:string[] = [
        
    ];

    (await this.db).run(request, pattern);
  }

  async update(:${className}):Promise<void>{
    const request:string = \`UPDATE  SET  WHERE id=?\`;
    const pattern:string[] = [

        .getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async delete(:${className}):Promise<void>{
    const request:string = \`DELETE FROM  WHERE id = ?\`;
    const pattern:string[] = [
        .getId().toString()
    ];

    (await this.db).run(request, pattern);
  }

  async findAll():Promise<${className}[]>{
    const request:string = \`SELECT * FROM \`;

    return (await this.db).all(request);
  }

  async findById(id:number):Promise<${className}|undefined>{
    const request:string = \`SELECT * FROM  WHERE id = ?\`;
    const pattern:string[] = [
        id.toString()
    ];

    return (await this.db).get(request, pattern);
  }
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

regenerateFactoryDAO();
regenerateFactorySqliteDAO();

console.log('Table addition complete.');