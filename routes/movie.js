const express = require("express");
const router = express.Router();

const movieSchema = require("../models/movieSchema");

router.post("/", (req, res, next) => {
  // USAGE ONE
  //   const { title, category, country, year, imdb_score } = req.body;
  //   const movieData = new movieSchema({
  //     title: title,
  //     category: category,
  //     country: country,
  //     year: year,
  //     imdb_score: imdb_score
  //   });

  // USAGE TWO
  const movieData = new movieSchema(req.body);

  //   callback
  //   movieData.save((err, data) => {
  //     if (err) {
  //       res.json(err);
  //     }
  //     res.json(data);
  //   });

  // promise
  const promise = movieData.save();
  promise
    .then(data => {
      res.json({ status: 1 });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
