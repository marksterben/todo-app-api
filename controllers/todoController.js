const { Todo } = require("../models");

exports.getTodos = async (req, res) => {
  const todos = await Todo.findAll({ order: [["id", "ASC"]] });
  res.status(200).send({
    data: todos,
  });
};

exports.addTodo = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      errorMessage: "name is required",
    });

    return;
  }

  const newTodo = await Todo.create({ name: name, completed: false });

  res.status(201).json({
    message: "Todo successfully added!",
    created: newTodo,
  });
};

exports.updateTodo = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  if (!body.name) {
    res.status(400).json({
      errorMessage: "'name' and 'completed' is required",
    });

    return;
  }

  const todo = await Todo.findByPk(id);

  if (!todo) {
    res.status(400).json({
      errorMessage: "Edit todo failed. Not implemented",
    });

    return;
  }

  todo.name = body.name;
  todo.completed = body.completed;
  await todo.save();

  res.status(200).json({
    message: "Todo successfully edited",
  });
};

exports.removeTodo = async (req, res) => {
  const id = req.params.id;

  const todo = await Todo.findByPk(id);

  // check if fact is exist
  if (!todo) {
    res.status(400).json({
      errorMessage: "Remove todo failed. Not implemented",
    });

    return;
  }

  await todo.destroy();

  res.status(200).json({
    message: "Todo successfully removed",
  });
};

exports.removeCompletedTodos = async (req, res) => {
  await Todo.destroy({
    where: {
      completed: true,
    },
  });

  res.status(200).json({
    message: "All completed todos have been removed",
  });
};

exports.checkAllTodos = async (req, res) => {
  const checked = req.query.checked === "true";

  await Todo.update(
    { completed: checked },
    {
      where: {
        completed: !checked,
      },
    }
  );

  res.status(200).json({
    message: `All todos have been ${checked ? "checked" : "unchecked"}`,
  });
};
