const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

const usuarioController = {
    // Listar usuarios
    async list(req, res) {
        try {
            const usuarios = await Usuario.findAll(); // Método nativo de Sequelize
            res.render('usuarios/list', { usuarios, activePage: 'usuarios' });
        } catch (error) {
            console.error('Error al listar usuarios:', error);
            res.status(500).send('Error al listar usuarios');
        }
    },

    // Registrar un nuevo usuario
    async create(req, res) {
        const { nombre, correo, contrasena, rol } = req.body;

        try {
            // Validar campos obligatorios
            if (!nombre || !correo || !contrasena) {
                return res.status(400).send('Todos los campos obligatorios deben ser completados.');
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(contrasena, 10);

            // Crear el usuario
            await Usuario.create({
                nombre,
                correo,
                contrasena: hashedPassword,
                rol: rol || 'practicante',
            });

            res.redirect('/usuarios');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).send('Error al registrar usuario');
        }
    },

    // Mostrar un usuario por ID
    async show(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id); // Método nativo de Sequelize
            if (!usuario) {
                return res.status(404).send('Usuario no encontrado');
            }
            res.render('usuarios/show', { usuario, activePage: 'usuarios' });
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).send('Error al obtener el usuario');
        }
    },

    // Actualizar un usuario
    async update(req, res) {
        const { nombre, correo, contrasena, rol, activo } = req.body;

        try {
            // Validar campos obligatorios
            if (!nombre || !correo) {
                return res.status(400).send('El nombre y el correo son obligatorios.');
            }

            // Actualizar el usuario
            await Usuario.update(
                { nombre, correo, contrasena, rol, activo },
                { where: { id: req.params.id } } // Condición para actualizar
            );

            res.redirect('/usuarios');
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).send('Error al actualizar usuario');
        }
    },

    // Eliminar un usuario (desactivación lógica)
    async delete(req, res) {
        try {
            await Usuario.destroy({ where: { id: req.params.id } }); // Método nativo de Sequelize
            res.redirect('/usuarios');
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).send('Error al eliminar usuario');
        }
    },
};

module.exports = usuarioController;