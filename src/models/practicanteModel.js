const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Practicante = sequelize.define('Practicante', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tipo_documento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tipos_documento', // Nombre de la tabla en la base de datos
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    numero_documento: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null,
    },
    centro_estudio: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    genero: {
        type: DataTypes.ENUM('masculino', 'femenino', 'otro'),
        allowNull: true,
        defaultValue: null,
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
    },
    carrera_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carreras', // Nombre de la tabla en la base de datos
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
    },
    foto_perfil: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
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
}, {
    tableName: 'practicantes', // Nombre de la tabla en la base de datos
    timestamps: false, // No usar createdAt y updatedAt automáticamente
    validate: {
        fechaFinMayorQueFechaInicio() {
            if (this.fecha_fin && this.fecha_fin <= this.fecha_inicio) {
                throw new Error('La fecha_fin debe ser mayor que la fecha_inicio.');
            }
        },
    },
});

module.exports = Practicante;