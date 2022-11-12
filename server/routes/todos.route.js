const { Router } = require("express");
const router = Router();
const { todoController } = require("../controllers/todo.controllers");

router.post("/post", todoController.addTodo);
router.get("/post", todoController.getTodos);
router.delete("/post/:id", todoController.removeTodo);
router.patch("/post/:id", todoController.updateTodo);


module.exports = router;
