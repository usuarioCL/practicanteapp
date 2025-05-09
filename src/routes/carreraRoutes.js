const express = require('express');
const router = express.Router();
const carreraController = require('../controllers/carreraController');
const { isAdmin, isAuthenticated } = require('../middlewares/isAdmin'); // Importación corregida
const upload = require('../middlewares/upload'); // Middleware de multer

// Rutas para el CRUD de carreras
router.get('/',carreraController.list);
router.get('/edit/:id',  isAuthenticated, isAdmin,carreraController.show);
router.get('/create',  isAuthenticated, isAdmin,carreraController.createForm);
router.get('/mostrarestudiantes/:id',carreraController.getPracticantesByCarrera);

router.post('/update/:id', isAuthenticated, isAdmin, upload.single('imagen'), carreraController.update);
router.post('/delete/:id',isAuthenticated,  isAdmin, carreraController.delete);
router.post('/', isAuthenticated, isAdmin, upload.single('imagen'), carreraController.create);

module.exports = router;