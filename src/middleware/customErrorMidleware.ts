import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helpers/CustomError";

function errorMiddleware(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  response.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
