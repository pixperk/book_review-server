import mongoose from "mongoose";

export interface IBook extends mongoose.Document {
  title: string;
  author: string;
  description: string;
  price : number;
  user: mongoose.Schema.Types.ObjectId;
}

const BookSchema = new mongoose.Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", BookSchema);
