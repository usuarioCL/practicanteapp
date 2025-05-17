const Asistencia = require('../models/asistenciaModel');
const Practicante = require('../models/practicanteModel');
const { Op } = require('sequelize');

const asistenciaController = {
  // Listar asistencias con filtros opcionales
  async index(req, res) {
    try {
      const { practicante_id, fecha } = req.query;

      // Condiciones de búsqueda
      const where = {};
      if (practicante_id) {
        where.practicante_id = practicante_id;
      }
      if (fecha) {
        where.fecha = fecha;
      }

      // Obtener practicantes para el filtro y la vista
      const practicantes = await Practicante.findAll({ attributes: ['id', 'nombre'] });

      // Obtener asistencias con relación a practicante
      const asistencias = await Asistencia.findAll({
        where,
        include: [
          {
            model: Practicante,
            attributes: ['nombre'],
          }
        ],
        order: [['fecha', 'DESC']]
      });

      // Formatear datos para la vista
      const asistenciasFormateadas = asistencias.map(a => ({
        id: a.id,
        fecha: a.fecha,
        hora_entrada: a.hora_entrada,
        hora_salida: a.hora_salida,
        nombre_practicante: a.Practicante ? a.Practicante.nombre : ''
      }));

      const error = req.flash('error');
      const success = req.flash('success');

      res.render('asistencias', {
        practicantes,
        asistencias: asistenciasFormateadas,
        selectedPracticante: practicante_id || '',
        selectedFecha: fecha || '',
        activePage: 'asistencias',
        error: error.length > 0 ? error[0] : null,
        success: success.length > 0 ? success[0] : null
      });
    } catch (err) {
      console.error('Error al listar asistencias:', err);
      req.flash('error', 'Hubo un error al cargar las asistencias.');
      res.redirect('/dashboard');
    }
  },

  // Renderizar formulario de creación (si lo necesitas)
  async createForm(req, res) {
    try {
      const practicantes = await Practicante.findAll({ attributes: ['id', 'nombre'] });
      res.render('asistencias/create', {
        practicantes,
        activePage: 'asistencias'
      });
    } catch (error) {
      console.error('Error al mostrar el formulario de creación:', error);
      req.flash('error', 'Hubo un error al cargar el formulario.');
      res.redirect('/asistencias');
    }
  },

  // Registrar nueva asistencia
  async create(req, res) {
    const { practicante_id, fecha, hora_entrada, hora_salida } = req.body;

    if (!practicante_id || !fecha || !hora_entrada) {
      req.flash('error', 'Todos los campos obligatorios deben estar completos.');
      return res.redirect('/asistencias');
    }

    try {
      await Asistencia.create({
        practicante_id,
        fecha,
        hora_entrada,
        hora_salida: hora_salida || null
      });
      req.flash('success', 'Asistencia registrada exitosamente.');
      res.redirect('/asistencias');
    } catch (err) {
      console.error('Error al registrar asistencia:', err);
      req.flash('error', 'Error al registrar asistencia.');
      res.redirect('/asistencias');
    }
  },

  // Renderizar formulario de edición
  async edit(req, res) {
    try {
      const asistencia = await Asistencia.findByPk(req.params.id, {
        include: [{ model: Practicante, attributes: ['nombre'] }]
      });
      if (!asistencia) {
        return res.status(404).send('Asistencia no encontrada.');
      }
      const practicantes = await Practicante.findAll({ attributes: ['id', 'nombre'] });
      res.render('asistencias/edit', {
        asistencia,
        practicantes,
        activePage: 'asistencias'
      });
    } catch (err) {
      console.error('Error al mostrar el formulario de edición:', err);
      res.status(500).send('Error al mostrar el formulario de edición: ' + err.message);
    }
  },

  // Actualizar asistencia existente
  async update(req, res) {
    const { practicante_id, fecha, hora_entrada, hora_salida } = req.body;

    if (!practicante_id || !fecha || !hora_entrada) {
      req.flash('error', 'Todos los campos obligatorios deben estar completos.');
      return res.redirect(`/asistencias/${req.params.id}/edit`);
    }

    try {
      const asistencia = await Asistencia.findByPk(req.params.id);
      if (!asistencia) {
        return res.status(404).send('Asistencia no encontrada.');
      }

      await asistencia.update({
        practicante_id,
        fecha,
        hora_entrada,
        hora_salida: hora_salida || null
      });

      req.flash('success', 'Asistencia actualizada exitosamente.');
      res.redirect('/asistencias');
    } catch (err) {
      console.error('Error al actualizar la asistencia:', err);
      req.flash('error', 'Error al actualizar la asistencia.');
      res.redirect(`/asistencias/${req.params.id}/edit`);
    }
  },

  // Eliminar asistencia
  async delete(req, res) {
    try {
      const asistencia = await Asistencia.findByPk(req.params.id);
      if (!asistencia) {
        return res.status(404).send('Asistencia no encontrada.');
      }

      await asistencia.destroy();
      req.flash('success', 'Asistencia eliminada correctamente.');
      res.redirect('/asistencias');
    } catch (err) {
      console.error('Error al eliminar la asistencia:', err);
      req.flash('error', 'Ocurrió un error al eliminar la asistencia.');
      res.redirect('/asistencias');
    }
  }
};

module.exports = asistenciaController;