// import the necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// load environment variables from .env file
dotenv.config();

// define the express app and port
const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

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