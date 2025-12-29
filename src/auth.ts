import { Router } from "express";

import { UserDAO } from "./DAO/UserDAO";
import { UserService } from "./Services/UserService";
import { UserController } from "./Controllers/UserController";

export function authRoutes(userDAO:UserDAO): Router {
    const router = Router();

    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    router.get("/login", () => {
        
    });

    return router;
}