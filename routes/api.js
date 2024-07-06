'use strict';

const { Book } = require('../models');

module.exports = function (app) {
  app
    .route('/api/books')
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
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

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });

  app
    .route('/api/books/:id')
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
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
