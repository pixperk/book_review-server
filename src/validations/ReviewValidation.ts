import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }),
  review: z.string().min(1, { message: "Review cannot be empty" }),
});
