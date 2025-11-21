import { Router } from "express";

import { UserDAO } from "../DAO/UserDAO";
import { UserService } from "../Services/UserService";
import { UserController } from "../Controllers/UserController";

export function userRoutes(userDAO:UserDAO): Router {
    const router = Router();

    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    router.get("/", userController.getAll);
    router.get("/:id", userController.get);
    router.post("/", userController.create);
    router.delete("/id", userController.delete);
    router.put("/:id", userController.update);
    router.patch("/:id", userController.update);

    return router;
}