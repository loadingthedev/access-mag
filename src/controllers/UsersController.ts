import { NextFunction, Request, Response } from "express";
import { User, IUser } from "../models/User";
import { createError } from "../utils/error";
import { hashPassword } from "../utils/hash";
import UserDto from "../dtos/UserDto";

class UsersController {
  // Get all users
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      const result = users.map((user) => {
        return new UserDto(user);
      });
      res.json(result);
    } catch (error: any) {
      next(error);
    }
  }

  // Get user by id
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw createError(404, "User not found");
      }
      res.json(user);
    } catch (error: any) {
      next(error);
    }
  }

  // Create new user
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        throw createError(400, "No body");
      }
      ["name", "password", "email"].forEach((key) => {
        if (!req.body[key]) {
          throw createError(400, `${key} is required`);
        }
      });

      const user: IUser = await User.create({
        ...req.body,
        password: await hashPassword(req.body.password),
      });
      res.json(user);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UsersController();
