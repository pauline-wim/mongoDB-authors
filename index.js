const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://pauline-wim:kyyGVRC3aAuhoFl1@cluster0.lfdsc.mongodb.net/authors?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }.then(() => console.log("Project linked to mongoDB"))
);

// ROUTES

// Home
app.get("/", (_req, res) => {
  res.send("Authors API");
});

app.get("/authors", async (req, res) => {
  let authors;
  try {
    authors = await Postgres.query("SELECT * FROM authors");
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }

  res.json(authors.rows);
});

// Author & nationality
app.get("/authors/:id", async (req, res) => {
  // const author = authors.find((_a, i) => {
  //   const id = i + 1;
  //   return req.params.id === id.toString();
  // });
  // if (!author) {
  //   return res.send("This author does not exist, enter other ID.");
  // }
  // res.send(`${author.name}, ${author.nationality}`);

  let authors;
  try {
    authors = await Postgres.query(
      "SELECT * FROM authors WHERE authors.author_id=$1",
      [req.params.id]
    );
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }

  res.send(`${authors.rows[0].name}, ${authors.rows[0].nationality}`);
});

// Books of one said author
app.get("/authors/:id/books", async (req, res) => {
  // const books = authors[req.params.id - 1].books;
  // if (!books) {
  //   return res.send("This author can't be found");
  // }

  let books;
  try {
    books = await Postgres.query(
      "SELECT books FROM authors WHERE authors.author_id=$1",
      [req.params.id]
    );
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }

  res.send(books.rows[0].books.join(", "));
});

// Json route : author
app.get("/json/authors/:id", async (req, res) => {
  // const author = authors[req.params.id];
  // if (!author) {
  //   return res.json({ messsage: "This ID does not exist" });
  // }
  // delete author.books;
  // res.json(author);

  let authors;
  try {
    authors = await Postgres.query(
      "SELECT * FROM authors WHERE authors.author_id=$1",
      [req.params.id]
    );
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }

  delete authors.rows[0].books;

  res.json(authors.rows[0]);
});

// Json route : books
app.get("/json/authors/:id/books", async (req, res) => {
  // const books = authors[req.params.id].books;
  // if (!books) {
  //   return res.json({ messsage: "This author can't be found" });
  // }
  // res.json({ books });

  let books;
  try {
    books = await Postgres.query(
      "SELECT books FROM authors WHERE authors.author_id=$1",
      [req.params.id]
    );
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }

  res.send(books.rows[0]);
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

// Listen
app.listen(8000, () => {
  console.log("Listening on port 8000"); // localhost:8000
});
