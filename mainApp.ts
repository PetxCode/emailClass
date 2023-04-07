import express, { Application } from "express";
import cors from "cors";
import user from "./router/userRouter";

export const mainApp = async (app: Application) => {
  app
    .use(cors())
    .use(express.json())

    .use("/api/user", user);
};
