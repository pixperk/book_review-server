import express from "express";
import { createBookController, getAllBooksController, getBookByIdController } from "../controllers/BookController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validationMiddleware";
import { createBookSchema, getAllBooksSchema } from "../validations/BookValidation";



const router = express.Router();

router.get("/",  validateRequest(getAllBooksSchema), getAllBooksController);
router.get("/:id", getBookByIdController);
router.post("/",authenticate, authorize("admin"), validateRequest(createBookSchema), createBookController)


export default router;
