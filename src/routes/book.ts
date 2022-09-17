import { Router } from "express";

import Book from "../models/Book";
import verifyToken from "./verifyToken";

const bookRoute = Router();

bookRoute.get("/", verifyToken, (req, res) => {
  console.log(`[bookstore] book - getAll`);

  Book.find()
    .then((mgRes) => res.json(mgRes))
    .catch((err) => res.json(err));
});

bookRoute.post("/", verifyToken, (req, res) => {
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

bookRoute.patch("/:bookId", verifyToken, (req, res) => {
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

bookRoute.delete("/:bookId", verifyToken, (req, res) => {
  console.log(`[bookstore] book - delete: ${req.params.bookId}`);

  Book.deleteOne({ _id: req.params.bookId })
    .then((mgRes) => res.json(mgRes))
    .catch((err) => res.json(err));
});

export default bookRoute;
