const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

// Mostrar todas las asistencias
router.get('/', asistenciaController.listarAsistencias);

// Registrar nueva asistencia
router.post('/', asistenciaController.registrarAsistencia);

module.exports = router;