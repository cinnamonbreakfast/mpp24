import { Request, Response } from "express";

export const getOne = (req: Request, res: Response) => {
  res
    .status(200)
    .json({
      name: "Student",
    })
    .send();
};

export const getAll = (req: Request, res: Response) => {
  //res.send("All good!");
  res
    .status(200)
    .json({ string: "Hello" })
    .setHeader("Access-Control-Allow-Origin", "*");
};

export default {
  getOne,
  getAll,
};
