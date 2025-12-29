import { UserDAO } from "../DAO/UserDAO";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    constructor(private userDAO: UserDAO){}

  async login(email:string, password:string):Promise<string> {
    const user = await this.userDAO.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.Password))) {
      throw new Error("User incorrect");
    }

    return jwt.sign(
      {
        sub: user.Id,
        role: user.Role
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  }
}
