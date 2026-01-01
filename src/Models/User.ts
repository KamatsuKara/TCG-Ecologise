export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _password: string;
    private _role: string;
    private _create: number;

    constructor(id:number = 0, name:string = "", email:string = "", password:string = "", role:string = "USER", create:number = Date.now()){   
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
        this._create = create;
    }

    // Id
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    // Name
    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }

    // Email
    public get email(): string {
        return this._email;
    }
    public set email(email: string) {
        this._email = email;
    }

    // Password
    public get password(): string {
        return this._password;
    }
    public set password(password: string) {
        this._password = password;
    }

    // Role
    public get role(): string {
        return this._role;
    }
    public set role(role: string) {
        this._role = role;
    }

    // Create
    public get create(): number {
        return this._create;
    }
    public set create(create: number) {
        this._create = create;
    }
}