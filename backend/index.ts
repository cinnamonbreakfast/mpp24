import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getOne, getAll } from "./getAllHandler";
import "./socket";

// const  = studenthandler;

dotenv.config();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app: Express = express();
app.use(cors(corsOptions));
const port = process.env.PORT;

app.get("/", getAll);
app.get("/one", getOne);

app.listen(port, () => {
  console.group();
  console.log(`Server started at port ${port}`);
  console.groupEnd();
});

export default app;
