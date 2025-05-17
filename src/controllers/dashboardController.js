const { Practicante, Carrera } = require('../models');

const dashboardController = {
  async index(req, res) {
    try {
      const totalPracticantes = await Practicante.count();
      const practicantesActivos = await Practicante.count({ where: { activo: true } });
      const practicantesInactivos = await Practicante.count({ where: { activo: false } });

      // Practicantes por carrera
      const carreras = await Carrera.findAll({
        include: [{ model: Practicante, as: 'Practicantes' }],
      });

      const practPorCarrera = carreras.map(carrera => ({
        nombre: carrera.nombre,
        total: carrera.Practicantes.length,
      }));

      // Funcionalidades del panel de control
      const funcionalidades = [
        { titulo: 'Practicantes', descripcion: 'Gestiona los practicantes registrados.', icono: 'bi bi-people-fill', color: 'primary', enlace: '/practicantes' },
        { titulo: 'Asistencias', descripcion: 'Gestiona las asistencias de los practicantes.', icono: 'bi bi-calendar-check-fill', color: 'success', enlace: '/asistencias' },
        { titulo: 'Evidencias', descripcion: 'Gestiona las evidencias de los practicantes.', icono: 'bi bi-folder-fill', color: 'warning', enlace: '/evidencias' },
        { titulo: 'Reportes', descripcion: 'Genera reportes detallados.', icono: 'bi bi-bar-chart-fill', color: 'secondary', enlace: '/reportes' },
        { titulo: 'Configuración', descripcion: 'Ajusta las configuraciones del sistema.', icono: 'bi bi-gear-fill', color: 'secondary', enlace: '/configuracion' },
        { titulo: 'Usuarios', descripcion: 'Gestiona los usuarios del sistema.', icono: 'bi bi-person-fill', color: 'secondary', enlace: '/usuarios' },
      ];

      // Limitar a las tres funcionalidades más recientes
      const funcionalidadesRecientes = funcionalidades.slice(-3);

      res.render('dashboard', {
        totalPracticantes,
        practicantesActivos,
        practicantesInactivos,
        practPorCarrera,
        funcionalidades: funcionalidadesRecientes, // Enviar solo las tres más recientes
        activePage: 'dashboard',
      });
    } catch (error) {
      console.error('Error al cargar el dashboard:', error);
      res.status(500).send('Error al cargar el dashboard.');
    }
  },

  // Método para la API
  async getData(req, res) {
    try {
      const totalPracticantes = await Practicante.count();
      const practicantesActivos = await Practicante.count({ where: { activo: true } });
      const practicantesInactivos = await Practicante.count({ where: { activo: false } });

      // Practicantes por carrera
      const carreras = await Carrera.findAll({
        include: [{ model: Practicante, as: 'Practicantes' }],
      });

      const practPorCarrera = carreras.map(carrera => ({
        nombre: carrera.nombre,
        total: carrera.Practicantes.length,
      }));

      res.json({
        totalPracticantes,
        practicantesActivos,
        practicantesInactivos,
        practPorCarrera,
      });
    } catch (error) {
      console.error('Error al obtener los datos del dashboard:', error);
      res.status(500).json({ error: 'Error al obtener los datos del dashboard.' });
    }
  },
};

module.exports = dashboardController;