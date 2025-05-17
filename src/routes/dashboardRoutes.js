const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/isAdmin'); // Middleware para verificar autenticación
const dashboardController = require('../controllers/dashboardController'); 
// Ruta para el dashboard
router.get('/', isAuthenticated, dashboardController.index);

// Ruta para la API de datos del dashboard
router.get('/api/data', isAuthenticated, dashboardController.getData);

module.exports = router;