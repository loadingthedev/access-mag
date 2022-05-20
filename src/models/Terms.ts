import { Schema, Model, Document, model } from "mongoose";

export interface ITerms extends Document {
  terms: string;
}

const TermsSchema: Schema = new Schema(
  {
    terms: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const TermsModel: Model<ITerms> = model("Term", TermsSchema);
