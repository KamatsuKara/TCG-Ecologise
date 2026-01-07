import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import * as path from "path";

interface AuditLog {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  durationMs: number;
  request: any;
  response: any;
}

export function audit(req:Request, res:Response, next:NextFunction){
  const start = Date.now();
  const requestBody = JSON.parse(JSON.stringify(req.body || {}));
  const originalSend = res.send;
  let responseBody: any;  

  res.send = function (body:any){
    responseBody = body;
    return originalSend.call(this,body);
  };

  res.on("finish", () => {
    const end = Date.now();
    const durationMs = Number(end-start) / 1_000_000;

    const auditLog:AuditLog = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      request: {
        headers: maskSensitiveInfo(req.headers),
        body: maskSensitiveInfo(requestBody),
        params: req.params,
        query: req.query,
      },
      response: {
        body: (req.originalUrl!="/auth/login" ? maskSensitiveInfo(responseBody): "[REDACTED]"),
      },
      durationMs,
      timestamp: new Date().toISOString(),
    };

    log(auditLog);
  });

  next();
}

async function log(auditLog:AuditLog){
  if (!process.env.LogDir) throw new Error("Missing LogDir");
  const date = new Date();

  const dirYear = path.join(process.env.LogDir, date.getFullYear().toString());
  const dirMonth = path.join(dirYear, (date.getMonth() + 1).toString().padStart(2, "0"));
  const fileDay = path.join(dirMonth, `${date.getDate().toString().padStart(2, "0")}.jsonl`);

  await fs.mkdir(dirYear, { recursive: true });
  await fs.mkdir(dirMonth, { recursive: true });

  const line = JSON.stringify(auditLog) + "\n";
  await fs.appendFile(fileDay, line, { encoding: "utf8" });
}

function maskSensitiveInfo(obj:any){
    if (!obj || typeof obj !== 'object') return obj;
    const clone = Array.isArray(obj) ? [...obj] : { ...obj };
    for (const key of Object.keys(clone)) {
      if(["password", "token", "accessToken", "refreshToken", "authorization"].includes(key)){
        clone[key] = "[REDACTED]";
      }else if(typeof clone[key] === 'object' && clone[key] !== null){
        clone[key] = maskSensitiveInfo(clone[key]);
      }else if(typeof clone[key] === 'string' && clone[key] !== null){
        try {
          const parsed = JSON.parse(clone[key]);
          clone[key] = maskSensitiveInfo(parsed);
        } catch {}
      }
    }
    return clone;
  }