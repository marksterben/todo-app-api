const express = require("express");

const {
  addTodo,
  getTodos,
  removeTodo,
  updateTodo,
  removeCompletedTodos,
  checkAllTodos,
} = require("../controllers/todoController.js");

const router = express.Router({ caseSensitive: true });

const jsonParser = express.json();

router.get("/todos", getTodos);
router.post("/todo", jsonParser, addTodo);
router.put("/todo/:id", jsonParser, updateTodo);
router.delete("/todos", removeCompletedTodos);
router.delete("/todo/:id", removeTodo);
router.get("/todos/check", checkAllTodos);

module.exports = router;
