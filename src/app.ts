import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { userRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  return res.status(status).json({
    message: error.message,
    status: error.status,
  });
});
app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Example app listening on port ${configs.PORT}`);
});
