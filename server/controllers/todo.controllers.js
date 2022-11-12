const Todo = require("../models/Todo.model");

module.exports.todoController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.json(error.message);
    }
  },

  addTodo: async (req, res) => {
    const { title, completed } = req.body;
    try {
      const todo = await Todo.create({
        title,
        completed,
      });
      res.json(todo);
    } catch (error) {
      res.json(error.message);
    }
  },

  removeTodo: async (req, res) => {
    try {
      await Todo.findByIdAndRemove(req.params.id);
      res.json("Задача удалена!");
    } catch (error) {
      res.json(error.message);
    }
  },

  updateTodo: async (req, res) => {
    const { completed } = req.body;
    try {
      await Todo.findByIdAndUpdate(req.params.id, {
        completed,
      });
      console.log(completed);
      res.json("Изменения сохранены");
    } catch (error) {
      res.json(error.message);
    }
  },

  // getDrugsByCategoryId: async (req, res) => {
  //     try {
  //         const drug = await Drug.find({ category: req.params.id })
  //         res.json(drug)
  //     } catch (error) {
  //         res.json(error.message)
  //     }
  // },

  // getDrugById: async (req, res) => {
  //     try {
  //         const drug = await Drug.findById(req.params.id)
  //         res.json(drug)
  //     } catch (error) {
  //         res.json(error.message)
  //     }
  // },
};
