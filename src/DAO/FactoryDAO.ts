import { CardDAO } from "./CardDAO";
import { CardHistDAO } from "./CardHistDAO";
import { CardModelDAO } from "./CardModelDAO";
import { UserDAO } from "./UserDAO";
import { RarityDAO } from "./RarityDAO";

export abstract class FactoryDAO{
    abstract createCardDAO():CardDAO;
    abstract createCardHistDAO():CardHistDAO;
    abstract createCardModelDAO():CardModelDAO;
    abstract createUserDAO():UserDAO;
    abstract createRarityDAO():RarityDAO;
}