import { Router } from "express";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { UserDAO } from "../DAO/UserDAO";
import { UserService } from "../Services/UserService";
import { UserController } from "../Controllers/UserControllers";

export function userRoutes(userDAO:UserDAO): Router {
    const router = Router();

    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    router.get("/", userController.getAllUser);
    router.get("/:id", userController.getUser);
    router.post("/", userController.createUser);
    router.delete("/0", userController.deleteUser);
    router.put("/", userController.updateUser);
    router.patch("/", userController.updateUser);

    return router;
}
