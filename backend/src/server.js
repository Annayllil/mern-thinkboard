// import the necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// load environment variables from .env file
dotenv.config();

// define the express app and port
const app = express()
const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin:"http://localhost:5173",
  })
);
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// routes
app.use("/api/notes", notesRoutes);

// connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port:", PORT);
      console.log("Go to address: http://localhost:5001/api/notes");
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });