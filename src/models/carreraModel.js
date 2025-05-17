const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Carrera = sequelize.define('Carrera', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null, // Asegura que coincida con DEFAULT NULL en la base de datos
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    creado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Sequelize maneja CURRENT_TIMESTAMP como NOW
    },
    actualizado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Sequelize maneja CURRENT_TIMESTAMP como NOW
    },
}, {
    tableName: 'carreras', // Nombre de la tabla en la base de datos
    timestamps: false, // No usar createdAt y updatedAt automáticamente
});

module.exports = Carrera;