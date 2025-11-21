import express from "express";

import { cardHistRoutes } from "./Routes/CardHistRoutes";
import { cardModelRoutes } from "./Routes/CardModelRoutes";
import { cardRoutes } from "./Routes/CardRoutes";
import { histRoutes } from "./Routes/HistRoutes";
import { rarityRoutes } from "./Routes/RarityRoutes";
import { userRoutes } from "./Routes/UserRoutes";

import { FactoryDAO } from "./DAO/FactoryDAO";
import { FactorySqliteDAO } from "./DAO/Sqlite/FactorySqliteDAO";

const app = express()
const port = 3000

const factoryDAO:FactoryDAO = new FactorySqliteDAO('./dist/db/database.db');

app.use("/cardHists", cardHistRoutes(factoryDAO.createCardHistDAO()));
app.use("/cardModels", cardModelRoutes(factoryDAO.createCardModelDAO()));
app.use("/cards", cardRoutes(factoryDAO.createCardDAO()));
app.use("/hists", histRoutes(factoryDAO.createHistDAO()));
app.use("/raritys", rarityRoutes(factoryDAO.createRarityDAO()));
app.use("/users", userRoutes(factoryDAO.createUserDAO()));

app.listen(port, () => console.log("API running on port " + port));