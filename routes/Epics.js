const express = require('express');
const router = express.Router();
const epicController = require('../controllers/epicController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear una épica (en este caso, para lograrlo vía Postman).
router.post('/', authMiddleware, epicController.createEpic);

// Obtener todas las épicas.
router.get('/', authMiddleware, epicController.getAllEpics);

// Obtener una épica por ID.
router.get('/:epicId', authMiddleware, epicController.getEpicById);

// Obtener historias de una épica específica.
router.get('/:epicId/stories', authMiddleware, epicController.getEpicStories);

module.exports = router;