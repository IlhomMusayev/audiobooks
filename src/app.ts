require("dotenv").config();
import express from "express";
import { json, urlencoded } from "body-parser";
import Routes from "./routes/routes";
import config from "config";
import log from "./utils/logger";
import sequelize from "./db/connection";
import Relations from "./models/relation";
import swaggerDocs from "./utils/swagger";
import errorMiddleware from "./middleware/customErrorMidleware";

const PORT = config.get("port");

const app = express();
try {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(500).json({ message: err.message });
    }
  );
  // app.use(errorMiddleware);

  sequelize.authenticate();
  sequelize
    .sync({
      force: false,
    })
    .then(() => {
      console.log("Database synced");
    })
    .catch((error) => {
      console.error("Error syncing database:", error);
    });
  Relations();

  app.listen(PORT, () => {
    log.info(`=================================`);
    log.info(`SERVER IS LISTENING ON PORT ${PORT}`);
    log.info(`=================================`);
  });
} catch (error) {
  console.log(error);
} finally {
  Routes(app);
  swaggerDocs(app, 3000);
}
