const express = require('express');
const practicanteController = require('../controllers/practicanteController');

const router = express.Router();

// Rutas
router.get('/', practicanteController.getPracticantes); // Listar practicantes
router.get('/create', practicanteController.renderCreateForm); // Renderiza el formulario de creación
router.get('/edit/:id', practicanteController.editPracticante); // Renderiza el formulario de edición
router.get('/:id', practicanteController.getPracticanteById); // Obtener un practicante por ID
router.post('/create', practicanteController.createPracticante); // Crear un nuevo practicante
router.put('/:id', practicanteController.updatePracticante); // Actualizar un practicante
router.delete('/:id', practicanteController.deletePracticante); // Eliminar un practicante



module.exports = router;