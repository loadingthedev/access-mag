import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/error";
import { User } from "../models/User";
// import { hashPassword } from "../utils/hash.js";
import bcrypt from "bcryptjs";
import UserDto from "../dtos/UserDto";
import { generateToken } from "../utils/token";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      if (!req.body) {
        throw createError(400, "No body");
      }

      ["email", "password"].forEach((key) => {
        if (!req.body[key]) {
          throw createError(400, `${key} is required`);
        }
      });
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw createError(404, "User not found");
      }
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        throw createError(401, "Wrong password");
      }
      const token = await generateToken(user);
      const userDto = new UserDto(user);
      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.status(200).json(userDto);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
