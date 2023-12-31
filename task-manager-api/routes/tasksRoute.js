const express = require("express");
const { getAllTasks, getTask, createTask, deleteTask, updateTask } = require("../controllers/tasks");
const router = express.Router();


router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;
