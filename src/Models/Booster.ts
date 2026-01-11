import { BoosterModel } from "./BoosterModel";
import { User } from "./User";

export class Booster {
    private _id: number;
    private _seed: number;
    private _boosterModel: BoosterModel;
    private _user: User;
    private _obtened: Date;
    private _created: Date;

    constructor(id: number, seed: number, boosterModel: BoosterModel, user: User, obtened: Date, created: Date) {
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
    public get obtened(): Date {
        return this._obtened;
    }
    public set obtened(obtened: Date) {
        this._obtened = obtened;
    }

    // Created
    public get created(): Date {
        return this._created;
    }
    public set created(created: Date) {
        this._created = created;
    }
}