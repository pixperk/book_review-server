import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1].trim();
  if (!token) { res.status(401).json({ message: "Access denied. No token provided" });
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided" });
    return; // Ensure the function exits
  }}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const authorize = (role: "admin" | "user") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
       res.status(403).json({ message: "Access denied" });
       return;
    }
    next();
  };
};
