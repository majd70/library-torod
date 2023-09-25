const { Book } = require("../models");

exports.createBook = async (req, res) => {
  const { name, description, title, rating, user_id, category_id } = req.body;
  try {
    const book = await Book.create({
      name,
      description,
      title,
      rating,
      user_id,
      category_id,
    });

    res.status(201).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

exports.updateBook = async (req, res) => {
  const { name, description, title, rating } = req.body;
  const loggedInUserId = req.user.userId;
  const bookId = Number(req.params.id);
  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(403).json({ masg: "book not found" });
    }

    if (loggedInUserId !== book.user_id) {
      return res
        .status(403)
        .json({ masg: "you are not allow to update this book" });
    }
    book.name = name;
    book.title = title;
    book.description = description;
    book.rating = rating;

    await book.save();
    res.status(200).json({ masg: "book updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = Number(req.params.id);
  const loggedInUserId = req.user.userId;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.user_id !== loggedInUserId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this book" });
    }

    await book.destroy();

    res.status(200).json({ msg: "book deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
