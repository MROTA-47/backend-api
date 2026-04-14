const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("categorias"));
router.post("/", (req, res) => res.send("crear categoria"));

module.exports = router;