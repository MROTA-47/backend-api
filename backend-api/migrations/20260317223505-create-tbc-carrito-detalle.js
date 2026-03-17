'use strict';

module.exports = (sequelize, DataTypes) => {
  const CarritoDetalle = sequelize.define('CarritoDetalle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    carrito_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: DataTypes.INTEGER
  }, {
    tableName: 'tbc_carrito_detalle'
  });

  CarritoDetalle.associate = (models) => {

    CarritoDetalle.belongsTo(models.Carrito, {
      foreignKey: 'carrito_id'
    });


    CarritoDetalle.belongsTo(models.Producto, {
      foreignKey: 'producto_id'
    });

  };

  return CarritoDetalle;
};