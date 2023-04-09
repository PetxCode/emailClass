import express, { Application, Request, Response } from "express";
import cors from "cors";
import user from "./router/userRouter";
import ejs from "ejs";

export const mainApp = async (app: Application) => {
  app
    .set("view engine", "ejs")
    .use(express.static(`public`))
    .use(express.static(`${__dirname} public/css`))
    .use(express.static(`${__dirname} public/asset`))

    .use(cors())
    .use(express.json())

    .use("/view", (req: Request, res: any) => {
      try {
        res.render("index");
      } catch (error) {
        console.log(error);
      }
    })

    .use("/api/user", user);
};
