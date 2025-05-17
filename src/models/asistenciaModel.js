const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Asistencia = sequelize.define('Asistencia', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  practicante_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora_entrada: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_salida: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: null
  },
  estado: {
    type: DataTypes.ENUM('presente', 'ausente', 'tarde', 'permiso'),
    allowNull: false,
    defaultValue: 'presente'
  },
  tipo_permiso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hora_entrada_modificada: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: null
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  creado_en: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  actualizado_en: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'asistencias',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['practicante_id', 'fecha']
    }
  ]
});

// Relaciones (si tienes los modelos Practicante y TipoPermiso definidos)
const Practicante = require('./practicanteModel');
Asistencia.belongsTo(Practicante, { foreignKey: 'practicante_id' });

module.exports = Asistencia;