const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/", require("./routes/todos.route"));

mongoose.connect(
  "mongodb+srv://bersyak:u3wOhcqF3c3a4sj1@cluster0.akjwcf0.mongodb.net/todos",
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Успешно соединились с сервером MongoDB");

    app.listen(4000, () => {
      console.log("Сервер успешно запущен");
    });
  }
);
