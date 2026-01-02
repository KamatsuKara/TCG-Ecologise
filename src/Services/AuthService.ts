import { UserDAO } from "../DAO/UserDAO";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/User";

const SALT_ROUNDS = 12;

export class AuthService {
    constructor(private userDAO: UserDAO){}

    async login(email:string, password:string):Promise<string> {
        const user = await this.userDAO.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("User incorrect");
        }
        return jwt.sign({sub: user.id,role: user.role},process.env.JWT_SECRET!,{ expiresIn: "1h" });
    }

	async register(user:User){
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
		user.role = "USER";
        user.create = Date.now();
		this.userDAO.insert(user);
	}
}
