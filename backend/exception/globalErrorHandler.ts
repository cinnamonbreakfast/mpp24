import { NextFunction, Request, Response } from "express";

enum Exceptions {
  DBNotFoundException,
  DBDuplicateException,
}

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err?.name in Exceptions) {
    res.json({ error: err.message }).status(err.statusCode);
    return;
  }

  res.status(500);
  res.json({ error: err });
}
