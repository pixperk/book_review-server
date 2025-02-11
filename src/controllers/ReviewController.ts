import { Request, Response } from "express";
import { createReviewForBook, getReviewsByBookId } from "../services/ReviewService";
import { ZodError } from "zod";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getReviewsController = async (req: Request, res: Response) => {
  try {
    const {bookId} = req.params;
    if(!bookId) {
        throw new Error("Book Id is required");
    }
    const reviews = await getReviewsByBookId(bookId);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error || error instanceof ZodError
          ? error.message
          : "Bad Values",
    });
  }
};

export const createReviewController = async (req: AuthRequest, res: Response) => {
  try {
    const {bookId} = req.params;
    if(!bookId) {
        throw new Error("Book Id is required");
    }
    const userId = req.user?.id;
    if(!userId) {
        throw new Error("Please authenticate to add a review");
    }
    const { rating, review } = req.body;
    const reviews = await createReviewForBook(bookId, userId!, rating, review);
    res.status(201).json({ reviews });
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error || error instanceof ZodError
          ? error.message
          : "Bad Values",
    });
  }
};
