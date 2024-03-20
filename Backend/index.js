import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("THIS IS HANXLA BOOK STORE");
});

// Route for save a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route for get all books from DB
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route for get one book using id from DB
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;  // const id = req.params.id
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route for update a book from DB
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }

    const { id } = req.params; // const id = req.params.id;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route for delete a book from DB
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params; // const id = req.params.id;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

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
