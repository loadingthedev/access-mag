import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export const generateToken = async (user: IUser) => {
  const payload = {
    id: user.id,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};
