import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";
import { WalletController } from "../Controllers/WalletController";
import { WalletService } from "../Services/WalletService";
import { FactoryDAO } from "../DAO/FactoryDAO";

export function walletRoutes(factoryDAO: FactoryDAO): Router {
    const router = Router();

    const walletDAO = factoryDAO.createWalletDAO();
    const walletService = new WalletService(walletDAO);
    const walletController = new WalletController(walletService);

    router.get("/me", authJWT, requireRole(["ADMIN", "USER"]), walletController.getWalletByMe.bind(walletController));

    return router;
}