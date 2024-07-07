'use strict';

const { Book } = require('../models');

module.exports = function (app) {
  app
    .route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      try {
        const books = await Book.find({});
        if (!books) {
          return res.json([]);
        }

        const formatData = books.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            comments: book.comments,
            commentcount: book.comments.length,
          };
        });
        return res.json(formatData);
      } catch (err) {
        return res.json([]);
      }
    })

    .post(async function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if (!title) {
        return res.send('missing required field title');
      }

      const newBook = new Book({
        title,
        comments: [],
      });

      try {
        const book = await newBook.save();
        res.json({
          _id: book._id,
          title: book.title,
        });
      } catch (err) {
        res.send('there was an error saving');
      }
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'

      try {
        const deleted = await Book.deleteMany();
        console.log('deleted: ', deleted);
        res.send('complete delete successful');
      } catch {
        res.send('error');
      }
    });

  app
    .route('/api/books/:id')
    .get(async function (req, res) {
      let bookID = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        const book = await Book.findById(bookID);
        res.json({
          comments: book.comments,
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        });
      } catch (err) {
        res.json('no book exists');
      }
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
