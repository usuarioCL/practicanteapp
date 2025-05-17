const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TipoDocumento = sequelize.define('TipoDocumento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'tipos_documento', // Nombre de la tabla en la base de datos
    timestamps: false, // No usar createdAt y updatedAt automáticamente
    defaultScope: {
        order: [['id', 'ASC']], // Ordenar por id de menor a mayor
    },
});

module.exports = TipoDocumento;