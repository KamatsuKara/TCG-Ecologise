import sqlite3 from 'sqlite3';
import fs from 'fs';

var dbPath = "./dist/db/database.db"
var requestPath = "./Tools/SQL/Request.sql"

const args = process.argv.slice(2);
if (args.length == 2) {
    requestPath = args[0]
    dbPath = args[1]
}else if(args.length == 1){
    requestPath = args[0]
}else{
    console.error('Usage: node Tools/ExecSqlite.js [?RequestFile] [?DBFile]');
    process.exit(1);
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        throw err;
    }
    console.log('Connexion à la base de données SQLite réussie.');
});

fs.readFile(requestPath, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    const requests = data.toString().split(';');
    if(requests[requests.length-1] == "") requests.pop();
    db.serialize(() => {
        requests.forEach(request => {
            db.all(request, [], (err, rows) => {
                if (err) {
                    throw err
                }
                console.log(rows);
            }); 
        })
    });
    db.close();
});

