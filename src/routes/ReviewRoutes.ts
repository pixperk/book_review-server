import express from "express";
import {
  createReviewController,
  getReviewsController,
} from "../controllers/ReviewController";
import { authenticate } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validationMiddleware";
import { reviewSchema } from "../validations/ReviewValidation";

const router = express.Router();

router.get("/:bookId", getReviewsController);
router.post(
  "/:bookId",
  authenticate,
  validateRequest(reviewSchema),
  createReviewController
);

export default router;
