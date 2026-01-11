import { BoosterDAO } from "./BoosterDAO";
import { BoosterDropRateDAO } from "./BoosterDropRateDAO";
import { BoosterModelDAO } from "./BoosterModelDAO";
import { CardDAO } from "./CardDAO";
import { CardHistDAO } from "./CardHistDAO";
import { CardModelDAO } from "./CardModelDAO";
import { CardTradeDAO } from "./CardTradeDAO";
import { RarityDAO } from "./RarityDAO";
import { RefreshTokenDAO } from "./RefreshTokenDAO";
import { TradeDAO } from "./TradeDAO";
import { UserDAO } from "./UserDAO";

export abstract class FactoryDAO{
    abstract createBoosterDAO():BoosterDAO;
    abstract createBoosterDropRateDAO():BoosterDropRateDAO;
    abstract createBoosterModelDAO():BoosterModelDAO;
    abstract createCardDAO():CardDAO;
    abstract createCardHistDAO():CardHistDAO;
    abstract createCardModelDAO():CardModelDAO;
    abstract createCardTradeDAO():CardTradeDAO;
    abstract createRarityDAO():RarityDAO;
    abstract createRefreshTokenDAO():RefreshTokenDAO;
    abstract createTradeDAO():TradeDAO;
    abstract createUserDAO():UserDAO;
}