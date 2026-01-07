import express from "express";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET");
if (!process.env.port) throw new Error("Missing port");
if (!process.env.LogDir) throw new Error("Missing LogDir");

import { cardHistRoutes } from "./Routes/CardHistRoutes";
import { cardModelRoutes } from "./Routes/CardModelRoutes";
import { cardRoutes } from "./Routes/CardRoutes";
import { rarityRoutes } from "./Routes/RarityRoutes";
import { userRoutes } from "./Routes/UserRoutes";
import { authRoutes } from "./Routes/AuthRoutes";

import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

import { audit } from "./Middleware/auditMiddleware";

const app = express();
app.use(express.json());
app.use(audit);
const port = process.env.port;

const factoryDAO:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');

app.use("/cardhists", cardHistRoutes(factoryDAO));
app.use("/cardmodels", cardModelRoutes(factoryDAO));
app.use("/cards", cardRoutes(factoryDAO));
app.use("/raritys", rarityRoutes(factoryDAO));
app.use("/users", userRoutes(factoryDAO));

app.use("/auth", authRoutes(factoryDAO));

app.listen(port, () => console.log("API running on port " + port));