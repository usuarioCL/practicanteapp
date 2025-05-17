// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Debes iniciar sesión para acceder a esta página.');
    res.redirect('/login');
}
// Middleware para verificar si el usuario es administrador
function isAdmin(req, res, next) {
    if (req.user && req.user.rol === 'admin') {
        return next();
    }
    req.flash('error', 'No tienes permisos para realizar esta acción.');
    res.redirect('/dashboard');
}

module.exports = {
    isAdmin,
    isAuthenticated,
};