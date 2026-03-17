const { Producto, Categoria } = require("../models");

// GET todos
exports.getProductos = async (req, res) => {
  const productos = await Producto.findAll({ include: Categoria });
  res.json(productos);
};

// GET por id
exports.getProductoById = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id, {
    include: Categoria
  });

  if (!producto) {
    return res.status(404).json({ mensaje: "No encontrado" });
  }

  res.json(producto);
};

// POST
exports.createProducto = async (req, res) => {
  const nuevo = await Producto.create(req.body);
  res.json(nuevo);
};

// PUT
exports.updateProducto = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);

  if (!producto) {
    return res.status(404).json({ mensaje: "No encontrado" });
  }

  await producto.update(req.body);
  res.json(producto);
};

// DELETE
exports.deleteProducto = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);

  if (!producto) {
    return res.status(404).json({ mensaje: "No encontrado" });
  }

  await producto.destroy();
  res.json({ mensaje: "Eliminado" });
};