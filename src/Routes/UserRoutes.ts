import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { UserDAO } from "../DAO/UserDAO";
import { UserService } from "../Services/UserService";
import { UserController } from "../Controllers/UserController";

export function userRoutes(userDAO:UserDAO): Router {
    const router = Router();

    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), userController.getAll.bind(userController));
    router.get("/me", authJWT, requireRole(["ADMIN","USER"]), userController.getMe.bind(userController));
    router.get("/:id", authJWT, requireRole(["ADMIN"]), userController.get.bind(userController));
    router.post("/", authJWT, requireRole(["ADMIN"]), userController.create.bind(userController));
    router.delete("/id", authJWT, requireRole(["ADMIN"]), userController.delete.bind(userController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), userController.update.bind(userController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), userController.update.bind(userController));

    return router;
}