import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();
import booksRoute from "./routes/booksRoute.js";

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("THIS IS HANXLA BOOK STORE");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App coneected to DB");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }) 
  .catch((err) => {
    console.log(err);
  });
