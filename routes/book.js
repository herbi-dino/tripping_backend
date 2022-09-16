const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(`[bookstore] book - getAll`);

  Book.find()
    .then((mgRes) => res.json(mgRes))
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  console.log(`[bookstore] book - post: ${JSON.stringify(req.body)}`);

  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    price: req.body.price,
    publishDate: req.body.publishDate,
  });

  book
    .save()
    .then((mgRes) => res.json(mgRes))
    .catch((err) => res.json(err));
});

router.patch("/:bookId", (req, res) => {
  console.log(
    `[bookstore] book - update: ${req.params.bookId} - ${JSON.stringify(
      req.body
    )}`
  );

  Book.updateOne(
    { _id: req.params.bookId },
    {
      $set: {
        description: req.body.description,
        price: req.body.price,
      },
    }
  )
    .then((mgRes) => res.json(mgRes))
    .catch((err) => res.json(err));
});

router.delete("/:bookId", (req, res) => {
  console.log(`[bookstore] book - delete: ${req.params.bookId}`);

  Book.deleteOne({ _id: req.params.bookId })
    .then((mgRes) => res.json(mgRes))
    .catch((err) => res.json(err));
});

module.exports = router;
