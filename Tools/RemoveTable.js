const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node Tools/RemoveTable.js [NameTable]');
    process.exit(1);
}

const tableName = args[0];
const basePath = path.resolve(__dirname, '../src');

async function deleteFile(pathFolder, fileName) {
  try {
    const fullPath = path.join(pathFolder, fileName);
    fs.unlinkSync(fullPath);
    console.log(`File Deleted : ${fullPath}`);
  } catch (err) {
    console.error("Error :", err);
  }
}

deleteFile(path.join(basePath, 'DAO', 'Sqlite'), `${tableName}SqliteDAO.ts`);
deleteFile(path.join(basePath, 'DAO'), `${tableName}DAO.ts`);
deleteFile(path.join(basePath, 'Models'), `${tableName}.ts`);
deleteFile(path.join(basePath, 'Controllers'), `${tableName}Controller.ts`);
deleteFile(path.join(basePath, 'Services'), `${tableName}Service.ts`);
deleteFile(path.join(basePath, 'Routes'), `${tableName}Routes.ts`);

console.log('Table supression complete.');