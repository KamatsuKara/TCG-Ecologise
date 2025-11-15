import { CardDAO } from "../DAO/CardDAO";
import { CardHistDAO } from "../DAO/CardHistDAO";
import { CardModelDAO } from "../DAO/CardModelDAO";
import { UserDAO } from "../DAO/UserDAO";
import { RarityDAO } from "../DAO/RarityDAO";

export abstract class FactoryDAO{
    abstract createCardDAO():CardDAO;
    abstract createCardHistDAO():CardHistDAO;
    abstract createCardModelDAO():CardModelDAO;
    abstract createUserDAO():UserDAO;
    abstract createRarityDAO():RarityDAO;
}