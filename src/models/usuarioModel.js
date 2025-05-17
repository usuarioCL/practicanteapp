const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('admin', 'practicante'),
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    creado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    actualizado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    token_recuperacion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    expiracion_token: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    intentos_recuperacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    imagen_perfil: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    practicante_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'practicantes', // Nombre de la tabla relacionada
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'usuarios',
    timestamps: false, // No usar createdAt y updatedAt automáticamente
});

module.exports = Usuario;