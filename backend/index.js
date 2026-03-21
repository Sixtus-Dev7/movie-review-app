import dotenv from "dotenv";
dotenv.config();

import app from "./server.js";
import { AbstractCursor, MongoClient } from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_uri = process.env.MONGO_URI;
const port = process.env.PORT || 8000;
const client = new MongoClient(mongo_uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500
});

async function startserver() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startserver();