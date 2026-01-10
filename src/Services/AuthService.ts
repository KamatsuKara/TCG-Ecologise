import { UserDAO } from "../DAO/UserDAO";
import { RefreshTokenDAO } from "../DAO/RefreshTokenDAO";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { User } from "../Models/User";
import { RefreshToken } from "../Models/RefreshToken";
import { exit } from "node:process";

const SALT_ROUNDS = 12;

export class AuthService {
    constructor(private userDAO: UserDAO, private refreshTokenDAO:RefreshTokenDAO){}

    async login(email:string, password:string):Promise<string[]> {
        const user = await this.userDAO.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password)))
            throw new Error("User incorrect");

        const token:string = crypto.randomBytes(40).toString('hex');
        const newUserRT = new RefreshToken();
        newUserRT.tokenHash = await bcrypt.hash(token, SALT_ROUNDS);
        newUserRT.user = new User(user.id);
        newUserRT.expirationDate = Date.now() + (24 * 60 * 60 * 1000);
        newUserRT.revoked = false;
        this.refreshTokenDAO.insert(newUserRT);
        return [jwt.sign({sub: user.id,role: user.role},process.env.JWT_SECRET!,{ expiresIn: "1h" }),token];
    }

	async register(user:User){
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
		user.role = "USER";
        user.create = Date.now();
		this.userDAO.insert(user);
	}

    async refresh(refreshToken:string):Promise<string[]> {
        const userRefreshTokens:RefreshToken[] = await this.refreshTokenDAO.findAll();
        let userRefreshToken:RefreshToken|null = null;
        for (const userRT of userRefreshTokens) {
            if(await bcrypt.compare(refreshToken, userRT.tokenHash)){
                userRefreshToken = userRT;
                break;
            }
        }
        if(userRefreshToken == null)
            throw new Error("No refreshToken");
        if(userRefreshToken.expirationDate < Date.now() || userRefreshToken.revoked)
            throw new Error("refresh token experied");

        const user = await this.userDAO.findById(userRefreshToken.user.id);
        if(user==null) throw new Error("No User");
        const token:string = crypto.randomBytes(40).toString('hex');

        const newUserRT = new RefreshToken();
        newUserRT.tokenHash = await bcrypt.hash(token, SALT_ROUNDS);
        newUserRT.user = new User(user.id);
        newUserRT.expirationDate = Date.now() + (24 * 60 * 60 * 1000);
        newUserRT.revoked = false;
        this.refreshTokenDAO.insert(newUserRT);

        userRefreshToken.revoked = true;
        this.refreshTokenDAO.update(userRefreshToken);

        return [jwt.sign({sub: user.id,role: user.role},process.env.JWT_SECRET!,{ expiresIn: "1h" }),token];
    }
}
