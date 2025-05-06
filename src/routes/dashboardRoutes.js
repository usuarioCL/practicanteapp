// filepath: c:\Users\User\Documents\proyecto\practicantesapp\src\routes\dashboardRoutes.js
const express = require('express');
const router = express.Router();

// Middleware para verificar si el usuario está autenticado
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirige al login si no está autenticado
}

// Ruta para el dashboard
router.get('/', ensureAuthenticated, (req, res) => {
    const usuario = req.user; // Obtén el usuario autenticado desde la sesión
    res.render('dashboard', { usuario , activePage: 'dashboard' });
});

module.exports = router;