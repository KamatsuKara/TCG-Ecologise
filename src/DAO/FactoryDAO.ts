import { CardDAO } from "./CardDAO";
import { CardHistDAO } from "./CardHistDAO";
import { CardModelDAO } from "./CardModelDAO";
import { RarityDAO } from "./RarityDAO";
import { RefreshTokenDAO } from "./RefreshTokenDAO";
import { UserDAO } from "./UserDAO";

export abstract class FactoryDAO{
    abstract createCardDAO():CardDAO;
    abstract createCardHistDAO():CardHistDAO;
    abstract createCardModelDAO():CardModelDAO;
    abstract createRarityDAO():RarityDAO;
    abstract createRefreshTokenDAO():RefreshTokenDAO;
    abstract createUserDAO():UserDAO;
}