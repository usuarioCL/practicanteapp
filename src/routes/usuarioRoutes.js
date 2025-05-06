const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para listar usuarios
router.get('/listar', usuarioController.list);

// Ruta para mostrar el formulario de registro
router.get('/', usuarioController.createForm);

// Ruta para registrar un nuevo usuario
router.post('/create', usuarioController.create);

module.exports = router;