const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Authors = require("./models/authorsModel");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Project linked to mongoDB"));

app.use(express.json());

// ROUTES

// Home
app.get("/", (_req, res) => {
  res.send("Authors API");
});

app.get("/authors", async (req, res) => {
  let authors;
  try {
    authors = await Authors.find().select("-__v");
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }

  res.json(authors);
});

app.post("/authors", async (req, res) => {
  let authors;
  try {
    authors = await Authors.create(req.body);
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }

  res.status(201).json({
    message: "Author created",
  });
});

// Author & nationality
app.get("/authors/:id", async (req, res) => {
  let author;
  try {
    author = await Authors.findById(req.params.id)
      .select("name")
      .select("nationality");
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }
  if (!author) {
    res.json({ message: "This ID cannot be found in the database" });
  }
  res.send(author);
});

app.delete("/authors/:id", async (req, res) => {
  let author;
  try {
    author = await Authors.findByIdAndRemove(req.params.id);
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error has occured",
    });
  }

  res.status(201).json({
    message: `Author ${req.params.id} deleted`,
  });
});

// // Books of one said author
// app.get("/authors/:id/books", async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({
//       message: "An error has occured",
//     });
//   }

//   res.send();
// });

// // Json route : author
// app.get("/json/authors/:id", async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({
//       message: "An error has occured",
//     });
//   }
// });

// // Json route : books
// app.get("/json/authors/:id/books", async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({
//       message: "An error has occured",
//     });
//   }
// });

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

// Listen
app.listen(8000, () => {
  console.log("Listening on port 8000"); // localhost:8000
});
