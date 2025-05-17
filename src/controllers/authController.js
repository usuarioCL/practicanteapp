const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const authController = {
    // Procesar el inicio de sesión
    async login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error('Error del servidor:', err);
                return next(err);
            }
            if (!user) {
                req.flash('error', info.message);
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error('Error al iniciar sesión:', err);
                    return next(err);
                }
                res.redirect('/dashboard');
            });
        })(req, res, next);
    },

    // Procesar el registro de usuarios
    async register(req, res) {
        const { nombre, correo, contrasena, rol } = req.body;

        try {
            const existingUser = await Usuario.findOne({ where: { correo } });
            if (existingUser) {
                req.flash('error', 'El correo ya está registrado.');
                return res.redirect('/register');
            }

            const hashedPassword = await bcrypt.hash(contrasena, 10);

            await Usuario.create({
                nombre,
                correo,
                contrasena: hashedPassword,
                rol: rol || 'practicante',
            });

            req.flash('success', 'Usuario registrado exitosamente.');
            res.redirect('/login');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            req.flash('error', 'Hubo un error al registrar el usuario.');
            res.redirect('/register');
        }
    },

    // Cerrar sesión
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
    },
};

module.exports = authController;