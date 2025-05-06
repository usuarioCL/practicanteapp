// src/routes/carreraRoutes.js
const express = require('express');
const router = express.Router();
const carreraController = require('../controllers/carreraController');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAdmin');

router.get('/', carreraController.list);
router.get('/edit/:id', carreraController.show);
router.get('/create', carreraController.createForm);
router.post('/', isAuthenticated,isAdmin, carreraController.create);
router.post('/update/:id', isAdmin, carreraController.update);
router.post('/delete/:id', isAdmin, carreraController.delete);
router.get('/mostrarestudiantes/:id', carreraController.getPracticantesByCarrera);

module.exports = router;
