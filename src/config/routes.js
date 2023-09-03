const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => res.send("Função de listar os suários"));
router.post("/users", (req, res) => res.send("Função de adicionar usuário"));
router.put("/users/:id", (req, res) => res.send("Função de modificar usuário"));
router.delete("/users/:id", (req, res) => res.send("Função de deletar usuário"));

module.exports = router;