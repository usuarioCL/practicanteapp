// src/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController'); // Importa el controller
const router = express.Router();

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
    const errorMessage = req.flash('error'); 
    res.render('login', { errorMessage });
});

// Ruta para procesar el inicio de sesión
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirigir al dashboard si el login es exitoso
    failureRedirect: '/login', // Si falla, redirigir de nuevo al login
    failureFlash: true // Habilitar mensajes flash en caso de error
}));

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    const errorMessage = req.flash('error'); // Obtén el mensaje de error
    res.render('register', { errorMessage }); // Pásalo a la vista
});

// Ruta para procesar el registro de usuarios
router.post('/register', authController.register); // Usa el controller para manejar el registro

// Ruta para cerrar sesión
router.get('/logout', authController.logout); // Usa el controller para manejar el logout

module.exports = router;
