import { Book } from "../models/BookModel";

export const getAllBooks = async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
    const books = await Book.find().skip(skip).limit(limit).populate({
      path: "user",
      select: "name"
    });
    const totalBooks = await Book.countDocuments();
  
    return {
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
    };
  };

export const getBookById = async (id: string) => {
  const book = await Book.findById(id).populate({
    path: "user",
    select: "name"
  });
  return book;
};

export const createBook = async (
  title: string,
  author: string,
  description: string,
  price: number,
  userId: string
) => {
  const book = new Book({ title, author, description, price, user: userId });
  await book.save();
  return book;
};
