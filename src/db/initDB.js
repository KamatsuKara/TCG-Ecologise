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

