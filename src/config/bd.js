// src/db.js
const mysql = require('mysql2/promise'); // Usa el envoltorio de promesas

// Configura los detalles de la conexión con tu base de datos
const connection = mysql.createPool({
    host: 'localhost', // Cambia esto si tu base de datos está en otro servidor
    user: 'root', // Tu usuario de MySQL
    password: '', // Tu contraseña de MySQL
    database: 'practicantesapp', // El nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    
});

module.exports = connection;
