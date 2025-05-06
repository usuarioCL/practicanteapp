const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

const authController = {
    // Controlador para registrar un nuevo usuario
    async register(req, res) {
        const { nombre, email, password, rol } = req.body;

        try {
            // Verifica si el usuario ya existe
            const existingUser = await Usuario.findByUsername(nombre);
            if (existingUser) {
                req.flash('error', 'El usuario ya existe');
                return res.redirect('/register');
            }

            // Crea un nuevo usuario
            await Usuario.create(nombre, email, password, rol || 'practicante');
            req.flash('success', 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
            res.redirect('/login');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            req.flash('error', 'Hubo un error al registrar el usuario.');
            res.redirect('/register');
        }
    },

    // Controlador para cerrar sesión
    logout(req, res) {
        req.logout((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                req.flash('error', 'Hubo un error al cerrar sesión.');
                return res.redirect('/dashboard');
            }
            req.flash('success', 'Sesión cerrada exitosamente.');
            res.redirect('/');
        });
    }
};

module.exports = authController;