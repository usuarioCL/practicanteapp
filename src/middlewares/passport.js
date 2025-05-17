const passport = require('passport');
const { Usuario } = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id); // Serializa el ID del usuario
});

passport.deserializeUser(async (id, done) => {
    try {
        // Cambia findById por findByPk
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            done(null, usuario); // Deserializa el usuario
        } else {
            done(null, false); // Si no se encuentra el usuario
        }
    } catch (error) {
        done(error, null); // Manejo de errores
    }
});

module.exports = passport;