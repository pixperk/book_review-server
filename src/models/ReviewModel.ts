import mongoose from "mongoose";

export interface IReview extends mongoose.Document {
  book: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  review: string;
  rating: number;
}

const ReviewSchema = new mongoose.Schema<IReview>(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
