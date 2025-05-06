// src/models/carreraModel.js
const db = require('../config/bd'); // Conexión a la base de datos

const Carrera = {
    // Método para obtener todas las carreras
    async findAll() {
        const [result] = await db.query('SELECT id, nombre FROM carreras'); // Consulta para obtener las carreras
        return result; // Retorna el resultado de la consulta
    },
    // Método para obtener una carrera por ID
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM carreras WHERE id = ?', [id]);
        return rows[0];
    },

    // Método para crear una nueva carrera
    create: async (nombre) => {
        await db.query('INSERT INTO carreras (nombre) VALUES (?)', [nombre]);
    },

    // Método para actualizar una carrera existente
    update: async (id, nombre) => {
        await db.query('UPDATE carreras SET nombre = ? WHERE id = ?', [nombre, id]);
    },

    // Método para eliminar una carrera
    delete: async (id) => {
        await db.query('DELETE FROM carreras WHERE id = ?', [id]);
    }
};

module.exports = Carrera;
