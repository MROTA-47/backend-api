'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName: 'tbc_usuarios'
  });

  Usuario.associate = (models) => {

    Usuario.hasMany(models.Carrito, {
      foreignKey: 'id_usuario'
    });
  };

  return Usuario;
};