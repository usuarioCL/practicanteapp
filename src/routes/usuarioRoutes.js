const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { isAuthenticated, isAdmin } = require('../middlewares/isAdmin'); // Middlewares de autenticación y autorización

// Rutas para los usuarios
router.get('/listar', isAuthenticated, isAdmin, usuarioController.list); // Listar todos los usuarios
router.post('/create', isAuthenticated, isAdmin, usuarioController.create); // Crear un nuevo usuario
router.get('/:id', isAuthenticated, isAdmin, usuarioController.show); // Mostrar detalles de un usuario
router.put('/:id', isAuthenticated, isAdmin, usuarioController.update); // Actualizar un usuario
router.delete('/:id', isAuthenticated, isAdmin, usuarioController.delete); // Eliminar un usuario

module.exports = router;