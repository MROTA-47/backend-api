'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_usuarios extends Model {
    static associate(models) {}
  }

  tbc_usuarios.init({
    nombre: DataTypes.STRING(100),

    direccion: DataTypes.STRING(150),

    telefono: DataTypes.STRING(15),

    email: DataTypes.STRING(120),

    password: DataTypes.STRING(255),

    rol: {
      type: DataTypes.ENUM('admin','cliente'),
      allowNull: false,
      defaultValue: 'cliente'
    },

    fecha_registro: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'tbc_usuarios',
  });

  return tbc_usuarios;
};