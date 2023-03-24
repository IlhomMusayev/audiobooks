import { Request, Response, NextFunction } from "express";
import { CustomError } from "../helpers/CustomError";
import Sessions from "../models/sessions.model";
import User from "../models/users.model";
import { checkToken } from "../services/jwt.service";
declare global {
  namespace Express {
    interface Request {
      session?: Record<any, any>;
    }
  }
}
export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      // If the Authorization header is not present, return an error response
      throw new CustomError("Authorization header is not present", 401);
    }
    // Verify the JWT token and decode the payload
    const decodedToken = await checkToken(token);
    // Add the decoded payload to the request object
    const session: any = await Sessions.findOne({
      where: {
        id: decodedToken?.session_id,
      },
      include: { model: User },
    });

    // If the user is not found, return an error response
    if (!session) {
      res.status(401).json({
        ok: false,
        message: "Session isn't found",
      });
    } else {
      // If the user is found, add the user to the request object
      req.session = await session;
      next();
    }
  } catch (error) {
    // If the token is invalid or expired, return an error response
    new CustomError("Invalid or expired token", 401);
    next(error);
  }
}
