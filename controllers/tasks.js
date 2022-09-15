const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findOne({ _id: taskId });
        
    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskId}` });
    } else {
        res.status(200).json({ task });
    }
});

const deleteTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskId}` });
    } else {
        res.status(200).json({ task });
    }
});

const updateTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const { name, completed } = req.body;
        
    const task = await Task.findOneAndUpdate({ _id: taskId }, { 
        name: name, completed: completed 
    }, {
        new: true,
        runValidators: true
    });

    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskId}` });
    } else {
        res.status(200).json({ task });
    }
});

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    deleteTask,
    updateTask
}