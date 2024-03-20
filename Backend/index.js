import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
//Option 1: Allow all origins with default of cors(*)
app.use(cors());

//Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: [],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send(" THIS IS HANXLA BOOK STORE");
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
