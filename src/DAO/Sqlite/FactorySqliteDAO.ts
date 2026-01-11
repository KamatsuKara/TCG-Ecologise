import { BoosterDropRateSqliteDAO } from "./BoosterDropRateSqliteDAO";
import { BoosterModelSqliteDAO } from "./BoosterModelSqliteDAO";
import { BoosterSqliteDAO } from "./BoosterSqliteDAO";
import { CardHistSqliteDAO } from "./CardHistSqliteDAO";
import { CardModelSqliteDAO } from "./CardModelSqliteDAO";
import { CardSqliteDAO } from "./CardSqliteDAO";
import { CardTradeSqliteDAO } from "./CardTradeSqliteDAO";
import { RaritySqliteDAO } from "./RaritySqliteDAO";
import { RefreshTokenSqliteDAO } from "./RefreshTokenSqliteDAO";
import { TradeSqliteDAO } from "./TradeSqliteDAO";
import { UserSqliteDAO } from "./UserSqliteDAO";
import { CurrencySqliteDAO } from "./CurrencySqliteDAO";
import { WalletSqliteDAO } from "./WalletSqliteDAO";
import { CardMarketSqliteDAO } from "./CardMarketSqliteDAO";

import { FactoryDAO } from "../FactoryDAO";

import { BoosterDropRateDAO } from "../BoosterDropRateDAO";
import { BoosterModelDAO } from "../BoosterModelDAO";
import { BoosterDAO } from "../BoosterDAO";
import { CardHistDAO } from "../CardHistDAO";
import { CardModelDAO } from "../CardModelDAO";
import { CardDAO } from "../CardDAO";
import { CardTradeDAO } from "../CardTradeDAO";
import { RarityDAO } from "../RarityDAO";
import { RefreshTokenDAO } from "../RefreshTokenDAO";
import { TradeDAO } from "../TradeDAO";
import { UserDAO } from "../UserDAO";
import { CurrencyDAO } from "../CurrencyDAO";
import { WalletDAO } from "../WalletDAO";
import { CardMarketDAO } from "../CardMarketDAO";

export class FactorySqliteDAO extends FactoryDAO{
    private path:string;

    constructor(_path:string){
        super();
        this.path = _path;
    }

    createBoosterDropRateDAO():BoosterDropRateDAO{
        return new BoosterDropRateSqliteDAO(this.path);
    }

    createBoosterModelDAO():BoosterModelDAO{
        return new BoosterModelSqliteDAO(this.path);
    }

    createBoosterDAO():BoosterDAO{
        return new BoosterSqliteDAO(this.path);
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

    createCardTradeDAO():CardTradeDAO{
        return new CardTradeSqliteDAO(this.path);
    }

    createRarityDAO():RarityDAO{
        return new RaritySqliteDAO(this.path);
    }

    createRefreshTokenDAO():RefreshTokenDAO{
        return new RefreshTokenSqliteDAO(this.path);
    }

    createTradeDAO():TradeDAO{
        return new TradeSqliteDAO(this.path);
    }

    createUserDAO():UserDAO{
        return new UserSqliteDAO(this.path);
    }

    createCurrencyDAO(): CurrencyDAO {
        return new CurrencySqliteDAO(this.path);
    }

    createWalletDAO(): WalletDAO {
        return new WalletSqliteDAO(this.path);
    }

    createCardMarketDAO(): CardMarketDAO {
        return new CardMarketSqliteDAO(this.path);
    }
}