const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const directorSchema = require("../models/directorSchema");

// POST A NEW DIRECTOR
router.post("/", (req, res) => {
      const director = new directorSchema(req.body);

      const createDirector = director.save();

      createDirector
            .then(data => {
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

// GET DIRECTORS
router.get("/", (req, res) => {
      const getDirectors = directorSchema.aggregate([
            {
                  $lookup: {
                        from: "movies",
                        localField: "_id",
                        foreignField: "director_id",
                        as: "movies"
                  }
            }
            // {
            //       $unwind: {
            //             path: "$movie",
            //             preserveNullAndEmptyArrays: true
            //       }
            // }
      ]);
      getDirectors
            .then(data => {
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

//GET A SINGLE DIRECTOR WITH IT'S ID
router.get("/:director_id", (req, res) => {
      const getDirectors = directorSchema.aggregate([
            {
                  $match: {
                        _id: mongoose.Types.ObjectId(req.params.director_id)
                  }
            },
            {
                  $lookup: {
                        from: "movies",
                        localField: "_id",
                        foreignField: "director_id",
                        as: "movies"
                  }
            }
      ]);
      getDirectors
            .then(data => {
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

//UPDATE DIRECTOR
router.put("/update/:director_id", (req, res) => {
      const getDirector = directorSchema.findByIdAndUpdate(
            req.params.director_id,
            req.body,
            {
                  new: true
            }
      );
      getDirector
            .then(data => {
                  res.json(data);
            })
            .catch(err => {
                  res.json(err);
            });
});

// DELETE DIRECTOR
router.delete("/delete/:director_id", (req, res) => {
      const getDirector = directorSchema.findByIdAndRemove(
            req.params.director_id
      );
      getDirector
            .then(data => {
                  res.json({
                        message: "Director has been deleted successfuly."
                  });
            })
            .catch(err => {
                  res.json(err);
            });
});

module.exports = router;
