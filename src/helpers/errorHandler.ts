import { NextFunction, Request, Response } from "express";
import { CustomError } from "./CustomError";
export default function (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500).json({
    ok: false,
    message: err.message || "Something broke!",
  });
}
