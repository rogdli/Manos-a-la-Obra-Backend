const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear un proyecto (en este caso, vía Postman).
router.post('/', authMiddleware, projectController.createProject);

// Obtener todos los proyectos.
router.get('/', projectController.getAllProjects);

// Obtener un proyecto por su ID.
router.get('/:id', projectController.getProjectById);

// Obtener todas las épicas de un proyecto.
router.get('/:id/epics', projectController.getProjectEpics);

module.exports = router;