const db = require("../models");
const Categoria = db.Categoria;

exports.getCategorias = async (req, res) => {
  const data = await Categoria.findAll();
  res.json(data);
};

exports.getCategoriaById = async (req, res) => {
  const data = await Categoria.findByPk(req.params.id);
  res.json(data);
};

exports.createCategoria = async (req, res) => {
  const data = await Categoria.create(req.body);
  res.json(data);
};

exports.updateCategoria = async (req, res) => {
  await Categoria.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ mensaje: "Categoría actualizada" });
};

exports.deleteCategoria = async (req, res) => {
  await Categoria.destroy({
    where: { id: req.params.id }
  });
  res.json({ mensaje: "Categoría eliminada" });
};