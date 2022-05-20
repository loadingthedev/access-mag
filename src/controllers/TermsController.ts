import { NextFunction, Request, Response } from "express";
import { ITerms, TermsModel } from "../models/Terms";
import { createError } from "../utils/error";

class TermsController {
  //Get all faqs
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const terms = await TermsModel.find();
      res.json(terms);
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
      ["terms"].forEach((key) => {
        if (!req.body[key]) {
          throw createError(400, `${key} is required`);
        }
      });
      const term: ITerms = await TermsModel.create({
        ...req.body,
      });
      res.json(term);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new TermsController();
