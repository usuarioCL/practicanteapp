// src/models/usuarioModel.js
const bcrypt = require('bcryptjs');
const db = require('../config/bd'); // Conexión con promesas

const Usuario = {

    // Función para encontrar un usuario por su nombre de usuario
    async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0]; 
    },

    // Función para encontrar un usuario por su ID
    async findById(id) {
        const [result] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return result[0];
    },

    // Función para crear un nuevo usuario
    async create(nombre, email, password, rol) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, rol]
        );
    },

    async findAll() {
        const [rows] = await db.query('SELECT * FROM usuarios');
        return rows; // Retorna todos los usuarios
    },
};

module.exports = Usuario;
