import { Schema, Model, Document, model } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
}

const FaqSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const FaqModel: Model<IFaq> = model("Faq", FaqSchema);
