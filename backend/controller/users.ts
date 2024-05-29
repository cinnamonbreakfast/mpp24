import { randomUUID } from "crypto";
import {
  authUser,
  createUser,
  getUserById,
} from "../repository/userRepository";
import { User } from "../domain/User";
import { NextFunction, Request, Response } from "express";
import registerSchema from "../schemas/user/register.schema";
import { ValidationError } from "joi";
import loginSchema from "../schemas/user/login.schema";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let validation;
  try {
    validation = await registerSchema.validateAsync(req.body);
  } catch (e: ValidationError | any) {
    res
      .json({
        errors: e.details,
      })
      .status(400);
    return;
  }

  try {
    const id = randomUUID();
    await createUser({
      ...validation,
      id,
    } as User);

    res
      .json({
        data: {
          user: { id },
        },
      })
      .status(204);
  } catch (e) {
    next(e);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let validation;
  try {
    validation = await loginSchema.validateAsync(req.body);
    const user = await authUser(validation.username, validation.secretCode);
    if (user) {
      console.log(process.env.SECRET_JWT);
      const token = jwt.sign(user, process.env.SECRET_JWT!);
      res.json({
        response: {
          token,
          user,
        },
      });
    }
  } catch (e: ValidationError | any) {
    res
      .json({
        errors: e.details,
      })
      .status(400);
    return;
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.params.id);
    res
      .send({
        data: user,
      })
      .status(200);
  } catch (e) {
    next(e);
  }
};
