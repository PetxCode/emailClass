import express, { Application } from "express";
import { mainApp } from "./mainApp";
import mongoose from "mongoose";

const app: Application = express();

mainApp(app);
const server = app.listen(3111, () => {
  console.log("");
  console.log("Ready to roll");
  const url =
    "mongodb+srv://PeterPan:PeterPan@codelab.eqkgv.mongodb.net/EmailDB?retryWrites=true&w=majority";
  mongoose
    .connect(url)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
});

process.on("uncaughtException", (error: Error) => {
  console.log("shutting down because of: uncaughtException");
  console.log(error);

  process.exit(1);
});

process.on("unhandledRejection", (error: Error) => {
  console.log("shutting down because of: unhandledRejection");
  console.log(error);

  server.close(() => {
    process.exit(1);
  });
});
