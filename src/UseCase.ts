import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

import { Card } from "./Models/Card";
import { CardHist } from "./Models/CardHist";
import { CardModel } from "./Models/CardModel";
import { User } from "./Models/User";
import { Rarity } from "./Models/Rarity";

import { CardDAO } from "./DAO/CardDAO";
import { CardHistDAO } from "./DAO/CardHistDAO";
import { CardModelDAO } from "./DAO/CardModelDAO";
import { UserDAO } from "./DAO/UserDAO";
import { RarityDAO } from "./DAO/RarityDAO";

const factory:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');
const cardDAO:CardDAO = factory.createCardDAO();
const cardHistDAO:CardHistDAO = factory.createCardHistDAO();
const cardModelDAO:CardModelDAO = factory.createCardModelDAO();
const userDAO:UserDAO = factory.createUserDAO();
const rarityDAO:RarityDAO = factory.createRarityDAO();

export class UseCase {

}