import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/UserRoutes";
import bookRoutes from "./routes/BookRoutes";
import reviewRoutes from "./routes/ReviewRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);  
app.use("/books", bookRoutes);  
app.use("/reviews", reviewRoutes);

export default app;
