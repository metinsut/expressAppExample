const mongoose = require("mongoose");

const database = () => {
  mongoose.connect("mongodb://localhost/movie");
  mongoose.connection.on("open", () => {
    console.log("we're connected! ");
  });
  mongoose.connection.on("error", err => {
    console.log("MongoDB: Error", err);
  });

  mongoose.Promise = global.Promise;
};

module.exports = database;
