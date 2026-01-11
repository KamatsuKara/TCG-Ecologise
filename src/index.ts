import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();

if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET");
if (!process.env.port) throw new Error("Missing port");
if (!process.env.LogDir) throw new Error("Missing LogDir");
if (!process.env.BDDSqliteDir) throw new Error("Missing BDDSqliteDir");

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

import { audit } from "./Middleware/auditMiddleware";

const app = express();
app.use(express.json());
app.use(audit);
app.use(cookieParser());
const port = process.env.port;

const factoryDAO:FactoryDAO = new FactorySqliteDAO(process.env.BDDSqliteDir);

app.use("/boosterdroprates", boosterDropRateRoutes(factoryDAO));
app.use("/boostermodels", boosterModelRoutes(factoryDAO));
app.use("/boosters", boosterRoutes(factoryDAO));
app.use("/cardhists", cardHistRoutes(factoryDAO));
app.use("/cardmodels", cardModelRoutes(factoryDAO));
app.use("/cards", cardRoutes(factoryDAO));
app.use("/cardtrades", cardTradeRoutes(factoryDAO));
app.use("/raritys", rarityRoutes(factoryDAO));
app.use("/trades", tradeRoutes(factoryDAO));
app.use("/users", userRoutes(factoryDAO));

app.use("/auth", authRoutes(factoryDAO));

app.listen(port, () => console.log("API running on port " + port));