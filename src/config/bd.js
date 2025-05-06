// src/db.js
const mysql = require('mysql2/promise'); // Usa el envoltorio de promesas

// Configura los detalles de la conexión con tu base de datos
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practicantesapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;
