const db = require('../config/bd');

// Mostrar asistencias y practicantes
exports.listarAsistencias = async (req, res) => {
  try {
    const [practicantes] = await db.query('SELECT id, nombre FROM practicantes');
    const [asistencias] = await db.query(`
      SELECT a.id, a.fecha, a.hora_entrada, a.hora_salida, p.nombre AS nombre_practicante
      FROM asistencias a
      INNER JOIN practicantes p ON a.practicante_id = p.id
      ORDER BY a.fecha DESC
    `);

    res.render('asistencias', { practicantes, asistencias, activePage: 'asistencias' });
  } catch (error) {
    console.error('Error al listar asistencias:', error);
    res.status(500).send('Error del servidor');
  }
};

// Registrar nueva asistencia
exports.registrarAsistencia = async (req, res) => {
  const { practicante_id, fecha, hora_entrada, hora_salida } = req.body;

  try {
    await db.query(
      'INSERT INTO asistencias (practicante_id, fecha, hora_entrada, hora_salida) VALUES (?, ?, ?, ?)',
      [practicante_id, fecha, hora_entrada, hora_salida || null]
    );
    res.redirect('/asistencias');
  } catch (error) {
    console.error('Error al registrar asistencia:', error);
    res.status(500).send('Error al registrar asistencia');
  }
};
