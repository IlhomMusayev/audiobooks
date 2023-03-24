import { Express } from "express";
import userRouter from "./user.route";
import path from "../constants/mainUrl";
import errorMiddleware from "../middleware/customErrorMidleware";

export default function Routes(app: Express) {
  try {
    app.use(`${path.mainPath}/auth`, userRouter);
  } finally {
    app.use(errorMiddleware);
  }
}
