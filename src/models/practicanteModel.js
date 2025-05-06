const db = require('../config/bd'); // Conexión con promesas

const Practicante = {
    // Función para obtener todos los practicantes
    async findAll() {
        const [result] = await db.query(`
            SELECT 
                practicantes.id, 
                practicantes.nombre, 
                practicantes.email, 
                practicantes.fecha_inicio, 
                carreras.nombre AS carrera_nombre
            FROM practicantes
            JOIN carreras ON practicantes.carrera_id = carreras.id
        `);
        return result;
    },

    async findByCarrera(carreraId) {
        const [result] = await db.query(`
            SELECT 
                practicantes.id, 
                practicantes.nombre, 
                practicantes.email, 
                practicantes.fecha_inicio, 
                carreras.nombre AS carrera_nombre
            FROM practicantes
            JOIN carreras ON practicantes.carrera_id = carreras.id
            WHERE carreras.id = ?
        `, [carreraId]);
        return result; // Retorna los practicantes de la carrera
    },

    // Función para obtener un practicante por su ID
    async findById(id) {
        const [result] = await db.query('SELECT * FROM practicantes WHERE id = ?', [id]);
        return result[0]; // Retorna el primer practicante encontrado
    },

    // Función para crear un nuevo practicante
    async create(data) {
        const { nombre, email, carreraId, fecha_inicio } = data;
        await db.query(
            'INSERT INTO practicantes (nombre, email, carrera_id, fecha_inicio) VALUES (?, ?, ?, ?)',
            [nombre, email, carreraId, fecha_inicio]
        );
    },

    // Función para actualizar un practicante
    async update(id, nombre, email, carrera_id, fecha_inicio) {
        await db.query(
            'UPDATE practicantes SET nombre = ?, email = ?, carrera_id = ?, fecha_inicio = ? WHERE id = ?',
            [nombre, email, carrera_id, fecha_inicio, id]
        );
    },

    // Función para eliminar un practicante
    async delete(id) {
        const [result] = await db.query('DELETE FROM practicantes WHERE id = ?', [id]);
        return result.affectedRows > 0; // Retorna true si se eliminó un registro
    },
};

module.exports = Practicante;