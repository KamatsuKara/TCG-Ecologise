import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { UserDAO } from "../DAO/UserDAO";
import { UserService } from "../Services/UserService";
import { UserController } from "../Controllers/UserController";

export function userRoutes(userDAO:UserDAO): Router {
    const router = Router();

    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), userController.getAll);
    router.get("/me", authJWT, requireRole(["ADMIN","USER"]), userController.getMe);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), userController.get);
    router.post("/", authJWT, requireRole(["ADMIN","USER"]), userController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN","USER"]), userController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN","USER"]), userController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN","USER"]), userController.update);

    return router;
}