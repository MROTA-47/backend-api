const db = require("../models");
const Carrito = db.Carrito;

exports.getCarritos = async (req, res) => {
  const data = await Carrito.findAll();
  res.json(data);
};

exports.getCarritoById = async (req, res) => {
  const data = await Carrito.findByPk(req.params.id);
  res.json(data);
};

exports.createCarrito = async (req, res) => {
  const data = await Carrito.create(req.body);
  res.json(data);
};

exports.updateCarrito = async (req, res) => {
  await Carrito.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ mensaje: "Carrito actualizado" });
};

exports.deleteCarrito = async (req, res) => {
  await Carrito.destroy({
    where: { id: req.params.id }
  });
  res.json({ mensaje: "Carrito eliminado" });
};