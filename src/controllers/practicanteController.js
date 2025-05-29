const { Practicante, Carrera, TipoDocumento } = require('../models');
const { Op } = require('sequelize'); 

const practicanteController = {
    // Obtener todos los practicantes
        async list(req, res) {
        try {
            const carreras = await Carrera.findAll();
            const { nombre, carrera, estado, page = 1, limit = 6 } = req.query; // Obtén los filtros, la página actual y el límite
            const where = {};
            const offset = (page - 1) * limit; // Calcular el desplazamiento
    
            if (nombre) {
                where.nombre = { [Op.like]: `%${nombre}%` }; // Filtro por coincidencias parciales
            }
    
            if (carrera) {
                where.carrera_id = carrera;
            }
    
            if (estado) {
                where.activo = estado === 'activo';
            }
    
            // Obtener el total de registros y los practicantes paginados
            const { count, rows: practicantes } = await Practicante.findAndCountAll({
                where,
                include: [{ model: Carrera, as: 'Carrera' }],
                limit: parseInt(limit), // Convertir el límite a número
                offset: parseInt(offset), // Convertir el desplazamiento a número
            });
    
            const totalPages = Math.ceil(count / limit); // Calcular el total de páginas
    
            res.render('practicantes', {
                practicantes,
                carreras,
                selectedNombre: nombre || '',
                selectedCarrera: carrera || '',
                selectedEstado: estado || '',
                currentPage: parseInt(page, 10), // Página actual
                totalPages, // Total de páginas
                limit: parseInt(limit), // Límite actual
                activePage: 'practicantes',
            });
        } catch (error) {
            console.error('Error al obtener los practicantes o carreras:', error);
            res.status(500).send('Error al cargar los datos.');
        }
    },

    // Obtener un practicante por ID
    async show(req, res) {
        try {
            const practicante = await Practicante.findByPk(req.params.id, {
                include: [Carrera], // Incluir la relación con Carrera
            });
            if (!practicante) {
                return res.status(404).send('Practicante no encontrado');
            }
            res.render('practicantes/show', { practicante, activePage: 'practicantes' });
        } catch (error) {
            console.error('Error al obtener el practicante:', error);
            res.status(500).send('Error al obtener el practicante: ' + error.message);
        }
    },    // Crear un nuevo practicante
    async create(req, res) {
        try {
            const {
                nombre,
                email,
                telefono,
                centro_estudio,
                direccion,
                genero,
                fecha_nacimiento,
                carrera_id,
                fecha_inicio,
                tipo_documento_id,
                numero_documento,
                observaciones,
                activo
            } = req.body;             // Manejar los campos de fecha
             const fecha_fin = req.body.fecha_fin && req.body.fecha_fin !== 'Invalid date' && req.body.fecha_fin.trim() !== '' ? req.body.fecha_fin : null;
             
             // Verificar y formatear fecha_nacimiento
             let fecha_nacimiento_valida = null;
             if (fecha_nacimiento && fecha_nacimiento.trim() !== '' && fecha_nacimiento !== 'Invalid date') {
                 const fechaObj = new Date(fecha_nacimiento);
                 if (!isNaN(fechaObj.getTime())) {
                     fecha_nacimiento_valida = fecha_nacimiento;
                 }
             }

            // Validación básica
            if (!nombre || !email || !carrera_id || !fecha_inicio || !tipo_documento_id || !numero_documento ) {
                return res.status(400).send('Todos los campos obligatorios deben ser completados.');
            }            // Manejar el archivo subido
            const foto_perfil = req.file ? req.file.filename : null;            await Practicante.create({
                nombre,
                email,
                telefono,
                centro_estudio,
                direccion,
                genero,
                fecha_nacimiento: fecha_nacimiento_valida,
                carrera_id,
                fecha_inicio,
                fecha_fin,
                tipo_documento_id,
                numero_documento,
                observaciones,
                foto_perfil,
                activo: true, // Por defecto, siempre activo
            });

            res.redirect('/practicantes');
        } catch (error) {
            console.error('Error al crear el practicante:', error);
            
            // Manejar específicamente el error de número de documento duplicado
            if (error.name === 'SequelizeUniqueConstraintError' && error.errors.some(err => err.path === 'numero_documento')) {
                // Cargar los datos necesarios para renderizar el formulario con el error
                const carreras = await Carrera.findAll();
                const tiposDocumento = await TipoDocumento.findAll();
                
                // Renderizar de nuevo el formulario con el mensaje de error
                return res.render('practicantes/create', { 
                    carreras, 
                    tiposDocumento, 
                    activePage: 'practicantes',
                    error: 'El número de documento ya está registrado. Por favor, use otro número.',
                    formData: req.body  // Pasar los datos del formulario para mantener lo que el usuario ya ingresó
                });
            }
            
            res.status(500).send('Error al crear el practicante: ' + error.message);
        }
    },    // Actualizar un practicante
    async update(req, res) {
        try {
            const {
                nombre,
                email,
                telefono,
                centro_estudio,
                direccion,
                genero,
                fecha_nacimiento,
                carrera_id,
                fecha_inicio,
                tipo_documento_id,
                numero_documento,
                observaciones,
                activo
            } = req.body;            // Manejar los campos de fecha
             const fecha_fin = req.body.fecha_fin && req.body.fecha_fin !== 'Invalid date' && req.body.fecha_fin.trim() !== '' ? req.body.fecha_fin : null;
             
             // Verificar y formatear fecha_nacimiento
             let fecha_nacimiento_valida = null;
             if (fecha_nacimiento && fecha_nacimiento.trim() !== '' && fecha_nacimiento !== 'Invalid date') {
                 const fechaObj = new Date(fecha_nacimiento);
                 if (!isNaN(fechaObj.getTime())) {
                     fecha_nacimiento_valida = fecha_nacimiento;
                 }
             }

            const practicante = await Practicante.findByPk(req.params.id);
            if (!practicante) {
                return res.status(404).send('Practicante no encontrado');
            }
            // Manejar el archivo subido
            const foto_perfil = req.file ? req.file.filename : practicante.foto_perfil;            await practicante.update({
                nombre,
                email,
                telefono,
                centro_estudio,
                direccion,
                genero,
                fecha_nacimiento: fecha_nacimiento_valida,
                carrera_id,
                fecha_inicio,
                fecha_fin,
                tipo_documento_id,
                numero_documento,
                observaciones,
                foto_perfil,
                activo: activo === 'on' ? true : false, 
            });
            res.redirect('/practicantes');
        } catch (error) {
            console.error('Error al actualizar el practicante:', error);
            
            // Manejar específicamente el error de número de documento duplicado
            if (error.name === 'SequelizeUniqueConstraintError' && error.errors.some(err => err.path === 'numero_documento')) {
                // Cargar los datos necesarios para renderizar el formulario con el error
                const carreras = await Carrera.findAll();
                const tiposDocumento = await TipoDocumento.findAll();
                const practicante = await Practicante.findByPk(req.params.id);
                
                // Renderizar de nuevo el formulario con el mensaje de error
                return res.render('practicantes/edit', { 
                    practicante,
                    carreras, 
                    tiposDocumento, 
                    activePage: 'practicantes',
                    error: 'El número de documento ya está registrado. Por favor, use otro número.',
                    formData: req.body  // Pasar los datos del formulario para mantener lo que el usuario ya ingresó
                });
            }
            
            res.status(500).send('Error al actualizar el practicante: ' + error.message);
        }
    },

    // Eliminar un practicante
    async delete(req, res) {
    try {
        const practicante = await Practicante.findByPk(req.params.id);
        if (!practicante) {
            return res.status(404).send('Practicante no encontrado');
        }

        await practicante.destroy();

        // Redirigir a la misma página con los filtros aplicados
        const { page = 1, nombre = '', carrera = '', estado = '' } = req.query;
        res.redirect(`/practicantes?page=${page}&nombre=${nombre}&carrera=${carrera}&estado=${estado}`);
    } catch (error) {
        console.error('Error al eliminar el practicante:', error);
        res.status(500).send('Error al eliminar el practicante.');
        }
    },    // Renderizar el formulario de creación
    async renderCreateForm(req, res) {
        try {
            const carreras = await Carrera.findAll(); // Obtener las carreras para el formulario
            const tiposDocumento = await TipoDocumento.findAll(); // Obtener los tipos de documento
     
            res.render('practicantes/create', { carreras, tiposDocumento, activePage: 'practicantes' });
        } catch (error) {
            console.error('Error al cargar el formulario de creación:', error);
            res.status(500).send('Error al cargar el formulario de creación.');
        }
    },
    // Cambiar el estado de un practicante
    async toggleState(req, res) {
    try {
        const { id } = req.params;

        // Buscar el practicante por ID
        const practicante = await Practicante.findByPk(id);

        if (!practicante) {
            return res.status(404).send('Practicante no encontrado');
        }

        // Alternar el estado
        practicante.activo = !practicante.activo;

        // Guardar el cambio en la base de datos
        await practicante.save();

        // Redirigir de vuelta a la lista de practicantes
        res.redirect('/practicantes');
    } catch (error) {
        console.error('Error al cambiar el estado del practicante:', error);
        res.status(500).send('Error al cambiar el estado del practicante.');
    }
    },
    
    //Editar un practicante
    async edit(req, res) {
        try {
            const { id } = req.params;
    
            // Buscar el practicante por ID
            const practicante = await Practicante.findByPk(id, {
                include: [Carrera], // Incluir relaciones si es necesario
            });
    
            if (!practicante) {
                return res.status(404).send('Practicante no encontrado');
            }
    
            // Obtener todas las carreras
            const carreras = await Carrera.findAll();
    
            // Obtener todos los tipos de documento
            const tiposDocumento = await TipoDocumento.findAll();
    
            // Renderizar el formulario de edición
            res.render('practicantes/edit', { practicante, carreras, tiposDocumento, activePage: 'practicantes' });
        } catch (error) {
            console.error('Error al cargar el formulario de edición:', error);
            res.status(500).send('Error al cargar el formulario de edición.');
        }
    }
};

module.exports = practicanteController;