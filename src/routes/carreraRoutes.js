const express = require('express');
const router = express.Router();
const carreraController = require('../controllers/carreraController');
const { isAdmin, isAuthenticated } = require('../middlewares/isAdmin'); // Importación de middlewares
const upload = require('../middlewares/upload'); // Middleware de multer para manejo de imágenes

// Rutas para el CRUD de carreras
router.get('/', carreraController.index);
router.get('/edit/:id', isAuthenticated, isAdmin, carreraController.edit); // Mostrar formulario de edición
router.get('/create', isAuthenticated, isAdmin, carreraController.createForm); // Mostrar formulario de creación
router.get('/mostrarestudiantes/:id', isAuthenticated, carreraController.getPracticantesByCarrera); // Mostrar practicantes por carrera

router.post('/update/:id', isAuthenticated, isAdmin, upload.single('imagen'), carreraController.update); // Actualizar una carrera
router.post('/delete/:id', isAuthenticated, isAdmin, carreraController.delete); // Eliminar una carrera
router.post('/', isAuthenticated, isAdmin, upload.single('imagen'), carreraController.create); // Crear una nueva carrera
module.exports = router;