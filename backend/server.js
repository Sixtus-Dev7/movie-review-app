import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import reviews from "./api/reviews.route.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  app.use(cors({
    origin: "*"
}));

const mongoURI = process.env.DATABASE_URL;

// CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ROUTES
app.use("/api/v1/reviews", reviewsRouter);

app.get("/api", (req, res) => {
  res.send("API is working ");
});

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});