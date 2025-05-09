const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController'); 
const router = express.Router();

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
    const errorMessage = req.flash('error'); 
    res.render('login', { errorMessage });
});

// Ruta para procesar el inicio de sesión
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', 
    failureRedirect: '/', 
    failureFlash: true 
}));

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    const errorMessage = req.flash('error');
    res.render('register', { errorMessage }); 
});

// Ruta para procesar el registro de usuarios
router.post('/register', authController.register); 

// Ruta para cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;
