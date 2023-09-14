const tasks = require("../models/TaskModel");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
  res.status(200).send(await tasks.find({}));
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = await tasks.create(req.body);
  res.status(201).json({ newTask });
});

const getTask = asyncWrapper(async (req, res) => {
  const task = await tasks.findOne({ _id: req.params.id });
  if (!task) {
    return res.status(404).send(`No task with the id : ${req.params.id}`);
  }
  res.status(200).send(task);
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await tasks.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    return res.status(404).send(`No task with the id : ${req.params.id}`);
  }
  res.status(200).send(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const task = await tasks.findOneAndUpdate({ _id: req.params.id }, req.body, {
    useFindAndModify: false,
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).send(`No task with the id : ${req.params.id}`);
  }
  res.status(200).send(task);
});

module.exports = { getAllTasks, createTask, deleteTask, updateTask, getTask };
