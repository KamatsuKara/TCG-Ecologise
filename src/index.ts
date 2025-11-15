import express from "express";
import { Request, Response } from "express";
import { UseCase } from "./UseCase";

const app = express()
const port = 3000

// Request

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})