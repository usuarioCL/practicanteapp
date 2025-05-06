const Usuario = require('../models/usuarioModel');

const usuarioController = {
    // Listar usuarios
    async list(req, res) {
        try {
            const usuarios = await Usuario.findAll(); 
            res.render('usuarios/list', { usuarios });
        } catch (error) {
            console.error('Error al listar usuarios:', error);
            res.status(500).send('Error al listar usuarios');
        }
    },

    // Mostrar formulario de registro
    createForm(req, res) {
        res.render('usuarios/register', { activePage: 'usuarios' }); 
    },

    // Registrar un nuevo usuario
    async create(req, res) {
        const { nombre, email, password, rol } = req.body;
        try {
            await Usuario.create(nombre, email, password, rol || 'practicante');
            res.redirect('/usuarios');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).send('Error al registrar usuario');
        }
    }
};

module.exports = usuarioController;