import { User } from "./User";

export class Trade {
    private _id: number;
    private _sender:User;
    private _receiver:User;
    private _status:string;
    private _created:number;
    private _updated: number|null;

    constructor(id: number, sender:User, receiver:User, status: string, created:number, updated: number|null) {
        this._id = id;
        this._sender = sender;
        this._receiver = receiver;
        this._status = status;
        this._created = created;
        this._updated = updated;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Sender
    public get sender(): User {
        return this._sender;
    }
    public set sender(sender: User) {
        this._sender = sender;
    }

    // Receiver
    public get receiver(): User {
        return this._receiver;
    }
    public set receiver(receiver: User) {
        this._receiver = receiver;
    }

    // Status
    public get status(): string {
        return this._status;
    }
    public set status(status: string) {
        this._status = status;
    }

    // Created
    public get created(): number {
        return this._created;
    }
    public set created(created: number) {
        this._created = created;
    }

    // Updated
    public get updated(): number | null {
        return this._updated;
    }
    public set updated(updated: number | null) {
        this._updated = updated;
    }
}