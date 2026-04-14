const db = require("../models");
const CarritoDetalle = db.CarritoDetalle;

exports.getCarritoDetalles = async (req, res) => {
  const data = await CarritoDetalle.findAll();
  res.json(data);
};

exports.getCarritoDetalleById = async (req, res) => {
  const data = await CarritoDetalle.findByPk(req.params.id);
  res.json(data);
};

exports.createCarritoDetalle = async (req, res) => {
  const data = await CarritoDetalle.create(req.body);
  res.json(data);
};

exports.updateCarritoDetalle = async (req, res) => {
  await CarritoDetalle.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ mensaje: "Detalle actualizado" });
};

exports.deleteCarritoDetalle = async (req, res) => {
  await CarritoDetalle.destroy({
    where: { id: req.params.id }
  });
  res.json({ mensaje: "Detalle eliminado" });
};