const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Obtener todos los usuarios.
router.get('/', userController.getAllUsers);

// Obtener un usuario por ID.
router.get('/:userId', userController.getUserById);

// Crear usuarios (solo para poblar la BD).
router.post('/', userController.createUser);

module.exports = router;