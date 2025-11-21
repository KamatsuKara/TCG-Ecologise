import { CardDAO } from "./CardDAO";
import { CardHistDAO } from "./CardHistDAO";
import { CardModelDAO } from "./CardModelDAO";
import { HistDAO } from "./HistDAO";
import { RarityDAO } from "./RarityDAO";
import { UserDAO } from "./UserDAO";

export abstract class FactoryDAO{
    abstract createCardDAO():CardDAO;
    abstract createCardHistDAO():CardHistDAO;
    abstract createCardModelDAO():CardModelDAO;
    abstract createHistDAO():HistDAO;
    abstract createRarityDAO():RarityDAO;
    abstract createUserDAO():UserDAO;
}