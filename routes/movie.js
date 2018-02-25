const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const movieSchema = require("../models/movieSchema");

// SEND A NEW MOVIE DATA
router.post("/", (req, res, next) => {
      // USAGE ONE
      // const { title, category, country, year, imdb_score } = req.body;
      // const movieData = new movieSchema({
      //       title: title,
      //       category: category,
      //       country: country,
      //       year: year,
      //       imdb_score: imdb_score
      // });

      // USAGE TWO
      const movieData = new movieSchema(req.body);

      //   callback
      // movieData.save((err, data) => {
      //       if (err) {
      //             res.json(err);
      //       }
      //       res.json(data);
      // });

      // promise
      const promise = movieData.save();
      promise
            .then(data => {
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

//GET ALL MOVIES
router.get("/", (req, res) => {
      const getMovies = movieSchema.aggregate([
            {
                  $lookup: {
                        from: "directors",
                        localField: "director_id",
                        foreignField: "_id",
                        as: "director"
                  }
            }
      ]);
      getMovies
            .then(data => {
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

//GET A SINGLE MOVIE WITH IT ID
router.get("/getmovie/:movie_id", (req, res) => {
      const singleMovie = movieSchema.findById(req.params.movie_id);
      singleMovie
            .then(data => {
                  if (!data) {
                        res.json({ error: "The movie was not found." });
                  }
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

//UPDATE A SINGLE MOVIE WITH IT ID
router.put("/updatemovie/:movie_id", (req, res) => {
      const singleMovie = movieSchema.findByIdAndUpdate(
            req.params.movie_id,
            req.body,
            {
                  new: true
            }
      );
      singleMovie
            .then(data => {
                  if (!data) {
                        res.json({ error: "The movie was not found." });
                  }
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

// DELETE A SINGLE MOVIE WITH IT ID
router.delete("/deletemovie/:movie_id", (req, res) => {
      const singleMovie = movieSchema.findByIdAndRemove(req.params.movie_id);
      singleMovie
            .then(data => {
                  if (!data) {
                        res.json({ error: "The movie was not found." });
                  }
                  res.json({ message: "The movie was deleted successfully." });
            })
            .catch(err => {
                  res.json(err);
            });
});

//GET TOP 10 LIST SORT WITH SCORE
router.get("/topten", (req, res) => {
      const getTopTen = movieSchema
            .find({})
            .limit(3)
            .sort({ imdb_score: -1 });
      getTopTen
            .then(data => {
                  if (!data) {
                        res.json({ message });
                  }
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

//GET BETWEEN TWO YEARS MOVIES
router.get("/between/:start/:end", (req, res) => {
      const getYears = movieSchema.find({
            year: {
                  $gte: parseInt(req.params.start),
                  $lte: parseInt(req.params.end)
            }
      });
      getYears
            .then(data => {
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

module.exports = router;
