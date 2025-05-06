const express = require('express');
const practicanteController = require('../controllers/practicanteController');
const router = express.Router();

// Rutas
router.get('/', practicanteController.getPracticantes); 
router.get('/create', practicanteController.renderCreateForm);
router.get('/edit/:id', practicanteController.editPracticante); 
router.get('/:id', practicanteController.getPracticanteById);
router.post('/create', practicanteController.createPracticante); 
router.put('/:id', practicanteController.updatePracticante); 
router.delete('/:id', practicanteController.deletePracticante); 



module.exports = router;