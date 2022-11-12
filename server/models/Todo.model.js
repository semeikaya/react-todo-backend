const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
