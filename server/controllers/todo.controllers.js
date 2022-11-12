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
      await Todo.create({
        title,
        completed,
      });
      res.json("Тудушка добавлена");
    } catch (error) {
      res.json(error.message);
    }
  },

  // deleteDrug: async (req, res) => {
  //     try {
  //         await Drug.findByIdAndRemove(req.params.id)
  //         res.json('Лекарство удалено!')
  //     } catch (error) {
  //         res.json(error.message)
  //     }
  // },

  // updateDrug: async (req, res) => {
  //     const { name, category, recipe, price, } = req.body
  //     try {
  //         await Drug.findByIdAndUpdate(req.params.id, {
  //             name,
  //             category,
  //             recipe,
  //             price,
  //         })
  //         res.json('Изменения сохранены')
  //     } catch (error) {
  //         res.json(error.message)
  //     }
  // },

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
