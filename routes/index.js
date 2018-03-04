const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");
const key = require("../helpers/apiSecretKey");

router.post("/authenticate", (req, res) => {
      const { username, password } = req.body;
      userSchema.findOne(
            {
                  username
            },
            (err, data) => {
                  if (err) {
                        throw err;
                  }
                  if (!data) {
                        res.json({
                              status: false,
                              message: " Authenticate failed, user not found."
                        });
                  } else {
                        bcrypt.compare(password, data.password).then(result => {
                              if (!result) {
                                    res.json({
                                          status: false,
                                          message:
                                                " Authenticate failed, wrong password."
                                    });
                              } else {
                                    const payload = {
                                          username
                                    };
                                    const token = jwt.sign(payload, key.api_secret_key, {
                                          expiresIn: 720
                                    });
                                    res.json({
                                          status: true,
                                          token
                                    });
                              }
                        });
                  }
            }
      );
});

router.post("/register", (req, res) => {
      const { username, password } = req.body;

      bcrypt.hash(password, 10).then(hash => {
            const user = new userSchema({
                  username,
                  password: hash
            });

            const userSave = user.save();
            userSave
                  .then(data => {
                        res.json(data);
                  })
                  .catch(err => {
                        res.json(err);
                  });
      });
});

module.exports = router;
