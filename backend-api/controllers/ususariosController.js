const db = require("../models");
const Usuario = db.Usuario;

exports.getUsuarios = async (req, res) => {
  const data = await Usuario.findAll();
  res.json(data);
};

exports.getUsuarioById = async (req, res) => {
  const data = await Usuario.findByPk(req.params.id);
  res.json(data);
};

exports.createUsuario = async (req, res) => {
  const data = await Usuario.create(req.body);
  res.json(data);
};

exports.updateUsuario = async (req, res) => {
  await Usuario.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ mensaje: "Usuario actualizado" });
};

exports.deleteUsuario = async (req, res) => {
  await Usuario.destroy({
    where: { id: req.params.id }
  });
  res.json({ mensaje: "Usuario eliminado" });
};