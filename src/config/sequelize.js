const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables de entorno

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME || 'practicantesapp', // Nombre de la base de datos
    process.env.DB_USER || 'root',           // Usuario
    process.env.DB_PASSWORD || '',           // Contraseña
    {
        host: process.env.DB_HOST || 'localhost', // Host
        dialect: 'mysql',                         // Dialecto (MySQL)
        logging: false,                           // Desactiva logs de SQL
    }
);

// Probar la conexión
(async () => {
    try {
        // Probar la conexión a la base de datos
        await sequelize.authenticate();
        // La conexión a la base de datos se ha establecido correctamente
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
    }
})();

module.exports = sequelize;