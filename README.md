# API Ecologise

## Configuration

Necessite un .env avec :

- JWT_SECRET : cle privait du jwt
- port : port utiliser de l'application
- LogDir : dossier contenant les dir (cree automatiquement si non present)
- BDDSqliteDir : fichier de la bdd en .sqlite (fournie)

## Execution

- npm run build : contruit le project en JS
- npm run start : run le project JS (il faut executer npm run build avant en cas de changement)
- npm run jest : lance les test jest (option : ":watch", ":coverage")

## Information suplementaire

### Tools

ExecSqlite.js sert a executer des requete SQLite sur la bdd
SQL contient des scripts sqlite utile comme l'initialisation et des donne de test

### Test

unit contient les test unitaire avec jest
et TCG-Ecologise-Bruno des test avec bruno
