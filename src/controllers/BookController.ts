import { Request, Response } from "express";
import { createBook, getAllBooks, getBookById } from "../services/BookService";
import { ZodError } from "zod";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getAllBooksController = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
  
      const data = await getAllBooks(page, limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Bad Values",
      });
    }
  };

export const getBookByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if(!id) {
        throw new Error("Id is required");
    }
    const book = await getBookById(id);
    res.json(book );
  } catch (error) {
    res
      .status(400)
      .json({
        message:
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Bad Values",
      });
  }
};

export const createBookController = async (req: AuthRequest, res: Response) => {
    try {
        const { title, author, description, price } = req.body;
        const userId = req.user?.id;
        if(!userId) {
            throw new Error("Please authenticate to add a book");
        }
        const book = await createBook(title, author, description, price, userId!);
        res.status(201).json( book );
      } catch (error) {
        res
          .status(400)
          .json({
            message:
              error instanceof Error || error instanceof ZodError
                ? error.message
                : "Bad Values",
          });
      }
}
