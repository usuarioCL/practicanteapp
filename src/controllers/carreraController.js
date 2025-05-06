const Carrera = require('../models/carreraModel');
const Practicante = require('../models/practicanteModel');

const carreraController = {
    // Listar todas las carreras
    list: async (req, res) => {
        try {
            const carreras = await Carrera.findAll();
            res.render('carreras', { title: 'Gestionar Carreras', carreras, activePage: 'carreras' });
        } catch (err) {
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

        // Validación básica
        if (!nombre || nombre.trim().length === 0) {
            return res.status(400).send('El nombre de la carrera es obligatorio.');
        }

        try {
            await Carrera.create(nombre);
            res.redirect('/carreras');
        } catch (err) {
            res.status(500).send('Error al crear la carrera: ' + err.message);
        }
    },

    // Actualizar una carrera existente
    update: async (req, res) => {
        const { nombre } = req.body;

        // Validación básica
        if (!nombre || nombre.trim().length === 0) {
            return res.status(400).send('El nombre de la carrera es obligatorio.');
        }

        try {
            await Carrera.update(req.params.id, nombre);
            res.redirect('/carreras');
        } catch (err) {
            res.status(500).send('Error al actualizar la carrera: ' + err.message);
        }
    },

    // Eliminar una carrera
    delete: async (req, res) => {
        try {
            await Carrera.delete(req.params.id);
            res.redirect('/carreras');
        } catch (err) {
            res.status(500).send('Error al eliminar la carrera: ' + err.message);
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
    }
};

module.exports = carreraController;