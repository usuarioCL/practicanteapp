const Practicante = require('../models/practicanteModel'); // Modelo de practicante
const Carrera = require('../models/carreraModel'); // Modelo de carrera

// Obtener todos los practicantes
const getPracticantes = async (req, res) => {
    try {
        const practicantes = await Practicante.findAll();
        res.render('practicantes', { practicantes, activePage: 'practicantes' });
    } catch (error) {
        res.status(500).send('Error al cargar los practicantes: ' + error.message);
    }
};

// Obtener un practicante por ID
const getPracticanteById = async (req, res) => {
    try {
        const practicante = await Practicante.findById(req.params.id);
        if (!practicante) {
            return res.status(404).send('Practicante no encontrado');
        }
        res.render('practicantes/show', { practicante, activePage: 'practicantes' });
    } catch (error) {
        res.status(500).send('Error al obtener el practicante: ' + error.message);
    }
};

// Crear un nuevo practicante
const createPracticante = async (req, res) => {
    try {
        const { nombre, email, carreraId, fecha_inicio } = req.body;

        // Validación básica
        if (!nombre || !email || !carreraId || !fecha_inicio) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        await Practicante.create({ nombre, email, carreraId, fecha_inicio });
        res.redirect('/practicantes');
    } catch (error) {
        res.status(500).send('Error al crear el practicante: ' + error.message);
    }
};

// Renderiza el formulario de creación
const renderCreateForm = async (req, res) => {
    try {
        const carreras = await Carrera.findAll();
        res.render('practicantes/create', { carreras, activePage: 'practicantes' });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario: ' + error.message);
    }
};

// Actualizar un practicante
const updatePracticante = async (req, res) => {
    try {
        const { nombre, email, carreraId, fecha_inicio } = req.body;

        // Validación básica
        if (!nombre || !email || !carreraId || !fecha_inicio) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        await Practicante.update(req.params.id, { nombre, email, carreraId, fecha_inicio });
        res.redirect('/practicantes');
    } catch (error) {
        res.status(500).send('Error al actualizar el practicante: ' + error.message);
    }
};

// Renderiza el formulario de edición
const editPracticante = async (req, res) => {
    try {
        const practicante = await Practicante.findById(req.params.id);
        if (!practicante) {
            return res.status(404).send('Practicante no encontrado');
        }

        const carreras = await Carrera.findAll();
        res.render('practicantes/edit', { practicante, carreras, activePage: 'practicantes' });
    } catch (error) {
        res.status(500).send('Error al cargar el practicante: ' + error.message);
    }
};

// Eliminar un practicante
const deletePracticante = async (req, res) => {
    try {
        const practicanteEliminado = await Practicante.delete(req.params.id);
        if (!practicanteEliminado) {
            return res.status(404).send('Practicante no encontrado');
        }
        res.redirect('/practicantes');
    } catch (error) {
        res.status(500).send('Error al eliminar el practicante: ' + error.message);
    }
};

module.exports = {
    getPracticantes,
    getPracticanteById,
    createPracticante,
    updatePracticante,
    deletePracticante,
    editPracticante,
    renderCreateForm,
};