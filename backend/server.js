import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import reviews from "./api/reviews.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

//  DEBUG ENV (to remove later if its not needed)
console.log("ENV:", process.env.DATABASE_URL);

//  MONGODB CONNECTION (SAFE CHECK)
const mongoURI = process.env.DATABASE_URL;

if (!mongoURI) {
  console.error(" DATABASE_URL is missing in .env");
} else {
  mongoose.connect(mongoURI)
    .then(() => console.log(" Database connected"))
    .catch(err => console.error(" DB connection error:", err));
}

//  API ROUTES
app.use("/api/v1/reviews", reviews);

app.get("/api", (req, res) => {
  res.send("API is working ");
});

//  SERVES FRONTEND (SAFE FOR API)
app.use(express.static(path.join(__dirname, "../frontend")));

// CATCH ALL
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

//  START SERVER
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});