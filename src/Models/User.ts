export class User {
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private role: string;
    private create: number;

    constructor(id:number = 0, name:string = "", email:string = "", password:string = "", role:string = "USER", create:number = Date.now()){   
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.create = create;
    }

    // Id
    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }

    // Name
    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }

    // Email
    public get Email(): string {
        return this.email;
    }
    public set Email(email: string) {
        this.email = email;
    }

    // Password
    public get Password(): string {
        return this.password;
    }
    public set Password(password: string) {
        this.password = password;
    }

    // Role
    public get Role(): string {
        return this.role;
    }
    public set Role(role: string) {
        this.role = role;
    }

    // Create
    public get Create(): number {
        return this.create;
    }
    public set Create(create: number) {
        this.create = create;
    }
}