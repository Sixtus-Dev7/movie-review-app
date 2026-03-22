import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json);

app.use("/api/v1/reviews", reviewss);

app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;