const express = require('express');
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/isAdmin'); // Middleware para proteger rutas
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
    const errorMessage = req.flash('error');
    const successMessage = req.flash('success');
    res.render('login', { errorMessage, successMessage });
});

// Ruta para procesar el inicio de sesión
router.post('/login', authController.login);

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    const errorMessage = req.flash('error');
    res.render('register', { errorMessage });
});

// Ruta para procesar el registro de usuarios
router.post('/register', authController.register);

// Ruta para cerrar sesión
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;