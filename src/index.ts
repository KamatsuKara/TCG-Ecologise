import express from "express";
import dotenv from "dotenv";

dotenv.config();

import { cardHistRoutes } from "./Routes/CardHistRoutes";
import { cardModelRoutes } from "./Routes/CardModelRoutes";
import { cardRoutes } from "./Routes/CardRoutes";
import { rarityRoutes } from "./Routes/RarityRoutes";
import { userRoutes } from "./Routes/UserRoutes";
import { authRoutes } from "./Routes/AuthRoutes";

import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

const app = express()
app.use(express.json());
const port = 3001

const factoryDAO:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');

app.use("/cardhists", cardHistRoutes(factoryDAO.createCardHistDAO()));
app.use("/cardmodels", cardModelRoutes(factoryDAO.createCardModelDAO()));
app.use("/cards", cardRoutes(factoryDAO.createCardDAO()));
app.use("/raritys", rarityRoutes(factoryDAO.createRarityDAO()));
app.use("/users", userRoutes(factoryDAO.createUserDAO()));

app.use("/auth", authRoutes(factoryDAO.createUserDAO()));

app.listen(port, () => console.log("API running on port " + port));