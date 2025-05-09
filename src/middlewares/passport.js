const passport = require('passport'); // Importa Passport
const Usuario = require('../models/usuarioModel'); // Asegúrate de que la ruta sea correcta

// Serialización del usuario
passport.serializeUser((usuario, done) => {
    if (!usuario || !usuario.id) {
        console.error("Error: El usuario no tiene un campo 'id'");
        return done(new Error("El usuario no tiene un campo 'id'"));
    }
    done(null, usuario.id);
});

// Deserialización del usuario
passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findById(id); // Busca el usuario por ID
        done(null, usuario);
    } catch (error) {
        console.error("Error al deserializar el usuario:", error);
        done(error, null);
    }
});

module.exports = passport; // Exporta Passport configurado