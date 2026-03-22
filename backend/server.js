import express from "express";
import cors from "cors"
import reviews from "./api/reviews.route.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/v1/reviews", reviews);

//Catch all 404 route
app.use((req, res) => {
  res.status(404).json({error: "not found"});
});

export default app;