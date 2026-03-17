const db = require('../models');
const Producto = db.tbc_productos;

exports.getProductos = async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
};