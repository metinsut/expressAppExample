const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database/index");
const movie = require("./routes/movie");
const director = require("./routes/director");

const app = express();
database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/movie", movie);
app.use("/api/director", director);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
      console.log("Node API is running...");
});
