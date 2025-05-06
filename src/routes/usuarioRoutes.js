const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//rutas
router.get('/listar', usuarioController.list);
router.get('/', usuarioController.createForm);
router.post('/create', usuarioController.create);

module.exports = router;