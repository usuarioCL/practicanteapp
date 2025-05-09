const db = require('../config/bd');

const Carrera = {
    // Método para obtener todas las carreras
    async findAll() {
        const [result] = await db.query('SELECT id, nombre, imagen FROM carreras'); 
        return result; 
    },
    
    // Método para obtener una carrera por ID
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM carreras WHERE id = ?', [id]);
        return rows[0];
    },

    // Método para crear una nueva carrera
    create: async (nombre, imagen) => {
        await db.query('INSERT INTO carreras (nombre, imagen) VALUES (?, ?)', [nombre, imagen]);
    },

    // Método para actualizar una carrera existente
    update: async (id, nombre, imagen = null) => {
        if (imagen) {
            await db.query('UPDATE carreras SET nombre = ?, imagen = ? WHERE id = ?', [nombre, imagen, id]);
        } else {
            await db.query('UPDATE carreras SET nombre = ? WHERE id = ?', [nombre, id]);
        }
    },

    // Método para eliminar una carrera
    delete: async (id) => {
        await db.query('DELETE FROM carreras WHERE id = ?', [id]);
    }
};

module.exports = Carrera;