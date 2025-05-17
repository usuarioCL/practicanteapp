const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

// Listar asistencias (con filtros opcionales)
router.get('/', asistenciaController.index);

// Mostrar formulario de creación de asistencia
router.get('/create', asistenciaController.createForm);

// Registrar nueva asistencia
router.post('/', asistenciaController.create);

// Mostrar formulario de edición de asistencia
router.get('/:id/edit', asistenciaController.edit);

// Actualizar asistencia existente
router.post('/:id/update', asistenciaController.update);

// Eliminar asistencia
router.post('/:id/delete', asistenciaController.delete);

module.exports = router;