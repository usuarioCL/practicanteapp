function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirige al login si no está autenticado
}
function isAdmin(req, res, next) {
    
    if (req.user && req.user.rol === 'admin') {
        return next(); // El usuario es administrador, continúa con la solicitud
    }
    res.status(403).send('Acceso denegado: No tienes permisos de administrador');
}

module.exports = isAdmin,isAuthenticated;