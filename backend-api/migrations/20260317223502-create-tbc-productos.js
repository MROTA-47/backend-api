'use strict';

module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'tbc_productos'
  });

  Producto.associate = (models) => {


    Producto.belongsTo(models.Categoria, {
      foreignKey: 'id_categoria'
    });


    Producto.hasMany(models.CarritoDetalle, {
      foreignKey: 'id_producto'
    });

  };

  return Producto;
};