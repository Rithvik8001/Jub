import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.id = decoded.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Unauthorized - Token expired" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
