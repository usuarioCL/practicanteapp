// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
// Middleware para verificar si el usuario es administrador
function isAdmin(req, res, next) {
    if (req.user && req.user.rol === 'admin') {
        return next();
    }
    req.flash('error', 'Acceso denegado: No tienes permisos de administrador');
    res.redirect('/carreras'); // Redirige a la página de carreras
}

module.exports = {
    isAdmin,
    isAuthenticated
};

module.exports = {
    isAdmin,
    isAuthenticated
};