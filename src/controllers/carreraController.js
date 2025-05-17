const { Carrera, Practicante } = require('../models');
const { Op } = require('sequelize'); 

const carreraController = {

    // Listar todas las carreras
    async index(req, res) {
        try {
            const { nombre, estado } = req.query;

            // Construir condiciones de búsqueda
            const where = {};
            if (nombre) {
                where.nombre = { [Op.like]: `%${nombre}%` }; // Buscar por nombre
            }
            if (estado) {
                where.activo = estado === 'activo'; // Filtrar por estado
            }

            // Obtener carreras filtradas
            const carreras = await Carrera.findAll({ where });

            // Pasar las variables a la vista
            const error = req.flash('error'); // Obtén los mensajes de error
            const success = req.flash('success'); // Obtén los mensajes de éxito

            res.render('carreras', {
                carreras,
                selectedNombre: nombre || '', // Pasar el filtro de nombre
                selectedEstado: estado || '', // Pasar el filtro de estado
                userRole: req.user ? req.user.rol : null,
                activePage: 'carreras',
                error: error.length > 0 ? error[0] : null, // Pasa el mensaje de error
                success: success.length > 0 ? success[0] : null, // Pasa el mensaje de éxito
            });
        } catch (err) {
            console.error('Error al listar las carreras:', err);
            req.flash('error', 'Hubo un error al cargar las carreras.');
            res.redirect('/dashboard');
        }
    },

    // Crear una nueva carrera
    async create(req, res) {
        const { nombre, descripcion } = req.body;
        const imagen = req.file ? req.file.filename : null;

        if (!nombre || nombre.trim().length === 0) {
            return res.status(400).send('El nombre de la carrera es obligatorio.');
        }

        if (!imagen) {
            return res.status(400).send('La imagen de la carrera es obligatoria.');
        }

        try {
            await Carrera.create({
                nombre,
                imagen,
                descripcion: descripcion || null,
                activo: true,
            });
            req.flash('success', 'Carrera creada exitosamente.');
            res.redirect('/carreras');
        } catch (err) {
            console.error('Error al crear la carrera:', err);
            req.flash('error', 'Error al crear la carrera.');
            res.redirect('/carreras/create');
        }
    },

    // Renderizar el formulario de edición
    async edit(req, res) {
        try {
            const carrera = await Carrera.findByPk(req.params.id); // Método nativo de Sequelize
            if (!carrera) {
                return res.status(404).send('Carrera no encontrada.');
            }

            res.render('carreras/edit', {
                title: 'Editar Carrera',
                carrera,
                activePage: 'carreras',
            });
        } catch (err) {
            console.error('Error al mostrar el formulario de edición:', err);
            res.status(500).send('Error al mostrar el formulario de edición: ' + err.message);
        }
    },

    // Actualizar una carrera existente
    async update(req, res) {
        const { nombre, descripcion } = req.body;
        const imagen = req.file ? req.file.filename : null;

        if (!nombre || nombre.trim().length === 0) {
            return res.status(400).send('El nombre de la carrera es obligatorio.');
        }

        try {
            const carrera = await Carrera.findByPk(req.params.id); // Método nativo de Sequelize
            if (!carrera) {
                return res.status(404).send('Carrera no encontrada.');
            }

            await carrera.update({
                nombre,
                imagen,
                descripcion: descripcion || null,
                activo: true,
            });

            req.flash('success', 'Carrera actualizada exitosamente.');
            res.redirect('/carreras');
        } catch (err) {
            console.error('Error al actualizar la carrera:', err);
            req.flash('error', 'Error al actualizar la carrera.');
            res.redirect(`/carreras/${req.params.id}/edit`);
        }
    },

    // Eliminar una carrera
    async delete(req, res) {
        try {
            const carrera = await Carrera.findByPk(req.params.id); // Método nativo de Sequelize
            if (!carrera) {
                return res.status(404).send('Carrera no encontrada.');
            }

            await carrera.destroy(); // Método nativo de Sequelize para eliminar
            req.flash('success', 'Carrera eliminada correctamente.');
            res.redirect('/carreras');
        } catch (err) {
            console.error('Error al eliminar la carrera:', err);
            req.flash('error', 'Ocurrió un error al eliminar la carrera.');
            res.redirect('/carreras');
        }
    },

    // Obtener practicantes por carrera
    async getPracticantesByCarrera(req, res) {
        try {
            const carrera = await Carrera.findByPk(req.params.id, {
                include: [Practicante], // Asegúrate de que Practicante esté relacionado con Carrera
            });

            if (!carrera) {
                return res.status(404).send('Carrera no encontrada.');
            }

            res.render('carreras/practicantes', {
                carrera,
                practicantes: carrera.Practicantes, // Practicantes asociados a la carrera
                activePage: 'carreras',
            });
        } catch (error) {
            console.error('Error al obtener los practicantes:', error);
            res.status(500).send('Error al obtener los practicantes.');
        }
    },
    async createForm(req, res) {
    try {
        res.render('carreras/create', {
            activePage: 'carreras',
            userRole: req.user ? req.user.rol : null,
        });
    } catch (error) {
        console.error('Error al mostrar el formulario de creación:', error);
        req.flash('error', 'Hubo un error al cargar el formulario.');
        res.redirect('/carreras');
    }
},
};

module.exports = carreraController;