import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/error";

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
  cb: any
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw createError(401, "No token");
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        throw createError(401, "Invalid token");
      }
      req.user = decoded;
      // next();
      cb();
    });
  } catch (error) {
    next(error);
  }
};

export const authUserMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    authMiddleWare(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  } catch (error) {
    next(error);
  }
};

export const authAdminMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    authMiddleWare(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  } catch (error) {
    next(error);
  }
};
