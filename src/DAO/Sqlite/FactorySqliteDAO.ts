import { CardSqliteDAO } from "./CardSqliteDAO";
import { CardHistSqliteDAO } from "./CardHistSqliteDAO";
import { CardModelSqliteDAO } from "./CardModelSqliteDAO";
import { UserSqliteDAO } from "./UserSqliteDAO";
import { RaritySqliteDAO } from "./RaritySqliteDAO";

import { FactoryDAO } from "../FactoryDAO";

import { CardDAO } from "../CardDAO";
import { CardHistDAO } from "../CardHistDAO";
import { CardModelDAO } from "../CardModelDAO";
import { UserDAO } from "../UserDAO";
import { RarityDAO } from "../RarityDAO";

export class FactorySqliteDAO extends FactoryDAO {
    private path:string;

    constructor(_path:string){
        super()
        this.path = _path;
    }

    createCardDAO():CardDAO{
        return new CardSqliteDAO(this.path);
    }

    createCardHistDAO():CardHistDAO{
        return new CardHistSqliteDAO(this.path);
    }

    createCardModelDAO():CardModelDAO{
        return new CardModelSqliteDAO(this.path);
    }

    createUserDAO():UserDAO{
        return new UserSqliteDAO(this.path);
    }

    createRarityDAO():RarityDAO{
        return new RaritySqliteDAO(this.path);
    }
}