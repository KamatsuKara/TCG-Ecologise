import express from "express";

import { authRoutes } from "./Routes/AuthRoutes";
import { boosterDropRateRoutes } from "./Routes/BoosterDropRateRoutes";
import { boosterModelRoutes } from "./Routes/BoosterModelRoutes";
import { boosterRoutes } from "./Routes/BoosterRoutes";
import { cardHistRoutes } from "./Routes/CardHistRoutes";
import { cardModelRoutes } from "./Routes/CardModelRoutes";
import { cardRoutes } from "./Routes/CardRoutes";
import { cardTradeRoutes } from "./Routes/CardTradeRoutes";
import { rarityRoutes } from "./Routes/RarityRoutes";
import { tradeRoutes } from "./Routes/TradeRoutes";
import { userRoutes } from "./Routes/UserRoutes";

import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

const app = express()
const port = 3000

const factoryDAO:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');

app.use("/auths", authRoutes(factoryDAO.createAuthDAO()));
app.use("/boosterDropRates", boosterDropRateRoutes(factoryDAO.createBoosterDropRateDAO()));
app.use("/boosterModels", boosterModelRoutes(factoryDAO.createBoosterModelDAO()));
app.use("/boosters", boosterRoutes(factoryDAO.createBoosterDAO()));
app.use("/cardHists", cardHistRoutes(factoryDAO.createCardHistDAO()));
app.use("/cardModels", cardModelRoutes(factoryDAO.createCardModelDAO()));
app.use("/cards", cardRoutes(factoryDAO.createCardDAO()));
app.use("/cardTrades", cardTradeRoutes(factoryDAO.createCardTradeDAO()));
app.use("/raritys", rarityRoutes(factoryDAO.createRarityDAO()));
app.use("/trades", tradeRoutes(factoryDAO.createTradeDAO()));
app.use("/users", userRoutes(factoryDAO.createUserDAO()));

app.listen(port, () => console.log("API running on port " + port));