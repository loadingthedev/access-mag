import { NextFunction, Request, Response } from "express";
import { FaqModel, IFaq } from "../models/Faq";
import { createError } from "../utils/error";

class FaqController {
  //Get all faqs
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const faqs = await FaqModel.find();
      res.json(faqs);
    } catch (error: any) {
      next(error);
    }
  }

  //create a faq
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        throw createError(400, "No body");
      }
      ["question", "answer"].forEach((key) => {
        if (!req.body[key]) {
          throw createError(400, `${key} is required`);
        }
      });
      const faq: IFaq = await FaqModel.create({
        ...req.body,
      });
      res.json(faq);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new FaqController();
