import { BoosterModel } from "./BoosterModel";
import { User } from "./User";

export class Booster {
    private _id: number;
    private _seed: number;
    private _boosterModel: BoosterModel;
    private _user: User;
    private _obtened: number;
    private _created: number;

    constructor(id: number = 0, seed: number = 0, boosterModel: BoosterModel = new BoosterModel(), user: User = new User(), obtened: number = Date.now(), created: number = Date.now()) {
        this._id = id;
        this._seed = seed;
        this._boosterModel = boosterModel;
        this._user = user;
        this._obtened = obtened;
        this._created = created;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Seed
    public get seed(): number {
        return this._seed;
    }
    public set seed(seed: number) {
        this._seed = seed;
    }

    // BoosterModel
    public get boosterModel(): BoosterModel {
        return this._boosterModel;
    }
    public set boosterModel(boosterModel: BoosterModel) {
        this._boosterModel = boosterModel;
    }

    // User
    public get user(): User {
        return this._user;
    }
    public set user(user: User) {
        this._user = user;
    }

    // Obtened
    public get obtened(): number {
        return this._obtened;
    }
    public set obtened(obtened: number) {
        this._obtened = obtened;
    }

    // Created
    public get created(): number {
        return this._created;
    }
    public set created(created: number) {
        this._created = created;
    }
}