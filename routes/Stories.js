const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear una historia (en este caso, vía Postman).
router.post('/', authMiddleware, storyController.createStory);

// Obtener todas las historias.
router.get('/', authMiddleware, storyController.getUserStories);

// Historia por id.
router.get('/:storyId', authMiddleware, storyController.getStoryById);

// Obtener tareas de una historia.
router.get('/:storyId/tasks', authMiddleware, storyController.getStoryTasks);

// Crear una tarea asociada a una historia.
router.post('/:storyId/tasks', authMiddleware, storyController.createStoryTask);

// Eliminar una tarea específica de una historia.
router.delete('/:storyId/tasks/:taskId', authMiddleware, storyController.deleteStoryTask);

module.exports = router;