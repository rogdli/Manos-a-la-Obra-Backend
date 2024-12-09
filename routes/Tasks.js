const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear una tarea.
router.post('/', authMiddleware, taskController.createTask);

// Obtener todas las tareas.
router.get('/', authMiddleware, taskController.getAllTasks);

// Obtener una tarea por ID.
router.get('/:taskId', authMiddleware, taskController.getTaskById);

module.exports = router;