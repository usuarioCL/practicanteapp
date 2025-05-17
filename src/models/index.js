const sequelize = require('../config/sequelize');
const Usuario = require('./usuarioModel');
const Practicante = require('./practicanteModel');
const Carrera = require('./carreraModel');
const TipoDocumento = require('./tipoDocumentoModel');

// Definir relaciones
Practicante.belongsTo(Carrera, { foreignKey: 'carrera_id' });
Carrera.hasMany(Practicante, { foreignKey: 'carrera_id' });

Practicante.belongsTo(TipoDocumento, { foreignKey: 'tipo_documento_id' });
TipoDocumento.hasMany(Practicante, { foreignKey: 'tipo_documento_id' });

Usuario.belongsTo(Practicante, { foreignKey: 'practicante_id' });
Practicante.hasOne(Usuario, { foreignKey: 'practicante_id' });

module.exports = {
    sequelize,
    Usuario,
    Practicante,
    Carrera,
    TipoDocumento,
};