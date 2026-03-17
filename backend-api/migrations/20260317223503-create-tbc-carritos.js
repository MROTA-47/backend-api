'use strict';

module.exports = (sequelize, DataTypes) => {
  const Carrito = sequelize.define('Carrito', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'tbc_carritos'
  });

  Carrito.associate = (models) => {

    Carrito.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id'
    });

    Carrito.hasMany(models.CarritoDetalle, {
      foreignKey: 'carrito_id'
    });

  };

  return Carrito;
};