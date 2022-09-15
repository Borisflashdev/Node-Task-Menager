const express = require('express');
const router = express.Router();

const { 
    getAllTasks,
    getSingleTask,
    createTask,
    deleteTask,
    updateTask 
} = require('../controllers/tasks');

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getSingleTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);

module.exports = router;