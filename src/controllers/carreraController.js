const Carrera = require('../models/carreraModel');
const Practicante = require('../models/practicanteModel');
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/usuarioModel'); 

const carreraController = {
    // Listar todas las carreras
    list: async (req, res) => {
        try {
            const carreras = await Carrera.findAll();
            res.render('carreras', {
                title: 'Listado de Carreras',
                carreras,
                activePage: 'carreras' // Define la página activa
            });
        } catch (err) {
            console.error('Error al listar las carreras:', err);
            res.status(500).send('Error al listar las carreras: ' + err.message);
        }
    },

    // Mostrar una carrera específica
    show: async (req, res) => {
        try {
            const carrera = await Carrera.findById(req.params.id);
            if (!carrera) {
                return res.status(404).send('Carrera no encontrada.');
            }
            res.render('carreras/edit', { title: 'Editar Carrera', carrera, activePage: 'carreras' });
        } catch (err) {
            res.status(500).send('Error al mostrar la carrera: ' + err.message);
        }
    },

    // Renderizar el formulario de creación
    createForm: (req, res) => {
        res.render('carreras/create', { title: 'Agregar Nueva Carrera', activePage: 'carreras' });
    },

    // Crear una nueva carrera
    create: async (req, res) => {
        const { nombre } = req.body;
        const imagen = req.file ? req.file.filename : null;
    
        if (!nombre || nombre.trim().length === 0) {
            return res.status(400).send('El nombre de la carrera es obligatorio.');
        }
    
        if (!imagen) {
            return res.status(400).send('La imagen de la carrera es obligatoria.');
        }
    
        try {
            await Carrera.create(nombre, imagen); // Asegúrate de que el modelo soporte ambos campos
            res.redirect('/carreras');
        } catch (err) {
            console.error('Error al crear la carrera:', err);
            res.status(500).send('Error al crear la carrera: ' + err.message);
        }
    },
    

    // Actualizar una carrera existente
    update: async (req, res) => {
        
        const { nombre } = req.body;
        const imagen = req.file ? req.file.filename : null;
    
        if (!nombre || nombre.trim().length === 0) {
            return res.status(400).send('El nombre de la carrera es obligatorio.');
        }
    
        try {
            if (imagen) {
                await Carrera.update(req.params.id, nombre, imagen);
            } else {
                await Carrera.update(req.params.id, nombre);
            }
            res.redirect('/carreras');
        } catch (err) {
            console.error('Error al actualizar la carrera:', err);
            res.status(500).send('Error al actualizar la carrera: ' + err.message);
        }
    },

    // Obtener practicantes por carrera
    getPracticantesByCarrera: async (req, res) => {
        try {
            const carreraId = req.params.id;
            const practicantes = await Practicante.findByCarrera(carreraId); 
            if (!practicantes || practicantes.length === 0) {
                return res.status(404).send('No se encontraron practicantes para esta carrera.');
            }
            res.render('carreras/mostrarestudiantes', { practicantes, carreraId, activePage: 'carreras' });
        } catch (err) {
            res.status(500).send('Error al obtener los practicantes: ' + err.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { password } = req.body;
    
            // Verifica que la contraseña fue enviada
            if (!password) {
                req.flash('error', 'La contraseña es obligatoria.');
                return res.redirect('/carreras');
            }
    
            // Obtén la contraseña del usuario autenticado
            const user = await Usuario.findById(req.user.id); // Cambiado a findById
    
            if (!user) {
                req.flash('error', 'Usuario no encontrado.');
                return res.redirect('/carreras');
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                req.flash('error', 'La contraseña es incorrecta.');
                return res.redirect('/carreras');
            }
    
            // Elimina la carrera
            console.log('Intentando eliminar carrera con ID:', req.params.id);
            await Carrera.delete(req.params.id);
    
            req.flash('success', 'Carrera eliminada correctamente.');
            res.redirect('/carreras');
        } catch (err) {
            console.error('Error al eliminar la carrera:', err);
            req.flash('error', 'Ocurrió un error al eliminar la carrera.');
            res.redirect('/carreras');
        }
    }
};

module.exports = carreraController;