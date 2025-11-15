import { CardDbDAO } from "./CardDbDAO";
import { CardHistDbDAO } from "./CardHistDbDAO";
import { CardModelDbDAO } from "./CardModelDbDAO";
import { UserDbDAO } from "./UserDbDAO";
import { RarityDbDAO } from "./RarityDbDAO";

import { FactoryDAO } from "../../Models/FactoryDAO";

import { CardDAO } from "../CardDAO";
import { CardHistDAO } from "../CardHistDAO";
import { CardModelDAO } from "../CardModelDAO";
import { UserDAO } from "../UserDAO";
import { RarityDAO } from "../RarityDAO";

export class FactoryDbDAO extends FactoryDAO {
    private path:string;

    constructor(_path:string){
        super()
        this.path = _path;
    }

    createCardDAO():CardDAO{
        return new CardDbDAO(this.path);
    }

    createCardHistDAO():CardHistDAO{
        return new CardHistDbDAO(this.path);
    }

    createCardModelDAO():CardModelDAO{
        return new CardModelDbDAO(this.path);
    }

    createUserDAO():UserDAO{
        return new UserDbDAO(this.path);
    }

    createRarityDAO():RarityDAO{
        return new RarityDbDAO(this.path);
    }
}