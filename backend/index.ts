import "./configs";

import express, { Express, Request, Response } from "express";

import cors from "cors";
import { getOne, getAll } from "./getAllHandler";
import "./socket";
import { getUser, loginUser, registerUser } from "./controller/users";
import { globalErrorHandler } from "./exception/globalErrorHandler";

// const  = studenthandler;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app: Express = express();
app.use(cors(corsOptions));
const port = process.env.PORT;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" }).status(200);
});
app.get("/", getAll);
app.get("/one", getOne);
app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/get/:id", getUser);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.group();
  console.log(`Server started at port ${port}`);
  console.groupEnd();
});

export default app;
