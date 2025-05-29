const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

// Serializar el usuario
passport.serializeUser((user, done) => {
    done(null, user.id); // Serializa el ID del usuario
});

// Deserializar el usuario
passport.deserializeUser(async (id, done) => {
    try {
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

// Configuración de la estrategia local de Passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await Usuario.findOne({ where: { correo: email } }); // Usar Sequelize para buscar al usuario
        if (!user) return done(null, false, { message: 'El correo no está registrado.' });
        if (!user.contrasena) return done(null, false, { message: 'El usuario no tiene una contraseña configurada.' });

        const isMatch = await bcrypt.compare(password, user.contrasena);
        if (!isMatch) return done(null, false, { message: 'La contraseña es incorrecta.' });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;