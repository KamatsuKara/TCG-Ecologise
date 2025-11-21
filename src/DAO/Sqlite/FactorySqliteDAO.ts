import { CardHistSqliteDAO } from "./CardHistSqliteDAO";
import { CardModelSqliteDAO } from "./CardModelSqliteDAO";
import { CardSqliteDAO } from "./CardSqliteDAO";
import { HistSqliteDAO } from "./HistSqliteDAO";
import { RaritySqliteDAO } from "./RaritySqliteDAO";
import { UserSqliteDAO } from "./UserSqliteDAO";

import { FactoryDAO } from "../FactoryDAO";

import { CardHistDAO } from "../CardHistDAO";
import { CardModelDAO } from "../CardModelDAO";
import { CardDAO } from "../CardDAO";
import { HistDAO } from "../HistDAO";
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

    createHistDAO():HistDAO{
        return new HistSqliteDAO(this.path);
    }

    createRarityDAO():RarityDAO{
        return new RaritySqliteDAO(this.path);
    }

    createUserDAO():UserDAO{
        return new UserSqliteDAO(this.path);
    }
}