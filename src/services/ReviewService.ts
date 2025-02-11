
import { Review } from "../models/ReviewModel";

export const getReviewsByBookId = async (bookId: string) => {
  const reviews = await Review.find({ book: bookId }).populate({
    path: "user",
    select: "id name email"
  });
  return reviews;
};


export const createReviewForBook = async (
  bookId: string,
  userId: string,
  rating: number,
  comment: string
) => {
  const review = new Review({
    book: bookId,
    user: userId,
    rating,
    review: comment,
  });
  await review.save();
  return review;
};
