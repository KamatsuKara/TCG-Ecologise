import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        role: string;
      } & JwtPayload;
    }
  }
}

export function authJWT(req:Request, res:Response, next:NextFunction){
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Missing token");

  const tokenString = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!tokenString.startsWith("Bearer ")) return res.status(401).send("Invalid token format");

  const token = tokenString.split(" ")[1];

  try {
    /*const decoded = jwt.decode(token) as (JwtPayload & { sub?: string; role?: string }) | null;
    if (decoded) {
      const exp = decoded.exp;
      console.log('Decoded token exp:', exp, '->', exp ? new Date(exp * 1000).toISOString() : 'no-exp');
      console.log('Decoded token payload:', { sub: decoded.sub, role: decoded.role });
    } else {
      console.log('Could not decode token (may be malformed)');
    }*/

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { sub:string; role:string; };
    req.user = {
      sub: payload.sub,
      role: payload.role
    };
    next();
  } catch(error:any){
    res.status(401).send("Invalid token: " + error.message);
  }
}

export function requireRole(roles:string[]){
  return (req:Request, res:Response, next:NextFunction) => {
    const role = req.user?.role
    if(!role) return res.status(403).send("No Role");
    if (!roles.includes(role)) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}
