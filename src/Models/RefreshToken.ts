import { User } from "./User";

export class RefreshToken {
    private _id:number;
    private _tokenHash:string;
    private _user:User;
    private _expirationDate:number;
    private _revoked:boolean

    constructor(id:number = 0, tokenHash:string = "",user:User = new User(),expirationDate:number = 0, revoked:boolean = true) {
        this._id = id;
        this._tokenHash = tokenHash;
        this._user = user;
        this._expirationDate = expirationDate;
        this._revoked = revoked;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // TokenHash
    public get tokenHash(): string {
        return this._tokenHash;
    }

    public set tokenHash(tokenHash: string) {
        this._tokenHash = tokenHash;
    }

    // User
    public get user(): User {
        return this._user;
    }

    public set user(user: User) {
        this._user = user;
    }

    // ExpirationDate
    public get expirationDate(): number {
        return this._expirationDate;
    }

    public set expirationDate(expirationDate: number) {
        this._expirationDate = expirationDate;
    }

    // Revoked
    public get revoked(): boolean {
        return this._revoked;
    }

    public set revoked(revoked: boolean) {
        this._revoked = revoked;
    }
}