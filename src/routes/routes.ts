import { Express } from "express";
import userRouter from "./user.route";
import path from "../constants/mainUrl";
import errorMiddleware from "../middleware/customErrorMidleware";
import categoryRouter from "./category.route copy";

export default function Routes(app: Express) {
  try {
    app.use(`${path.mainPath}/auth`, userRouter);
    app.use(`${path.mainPath}/categories`, categoryRouter);
  } finally {
    app.use(errorMiddleware);
  }
}
