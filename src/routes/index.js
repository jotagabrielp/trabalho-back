const express = require("express");
const router = express.Router();
const Funcionario = require("../models/funcionario");
const Ponto = require("../models/ponto");

router.post("/funcionario", async (req, res) => {
  const { nome, cpf, email, senha } = JSON.parse(req.body.data);
  const funcionario = new Funcionario({ nome, cpf, email, senha });
  await funcionario.save();
  res.json(funcionario);
});
router.post("/login", async (req, res) => {
  const funcionario = await Funcionario.findOne({ nome: req.body.nome });
  if (funcionario && req.body.password === funcionario.senha) {
    res.json(funcionario);
  } else {
    res.json({ message: "Usuário ou senha inválidos" });
  }
});

router.delete("/funcionario/:id", async (req, res) => {
  const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
  res.json({ message: "Funcionário excluído com sucesso", funcionario });
});

router.delete("/ponto/:id", async (req, res) => {
  const ponto = await Ponto.findByIdAndDelete(req.params.id);
  res.json({ message: "Ponto excluído com sucesso", ponto });
});

//USA ESSE
router.post("/ponto/:id", async (req, res) => {
  const funcionarioId = req.params.id;
  console.log(funcionarioId);
  const { entrada, saida } = req.body;
  Funcionario.findById(funcionarioId)
    .then(async (funcionario) => {
      const ponto = new Ponto({
        funcionario,
        entrada: new Date(entrada),
        saida: saida ? Date.now() : undefined,
      });

      try {
        await ponto.save();
        res.json({ message: "Ponto registrado com sucesso", funcionario });
      } catch (err) {
        res.status(500).json({ message: "Erro ao registrar ponto" });
      }
    })
    .catch((e) => console.log(e));
});
///USA ESSE
router.get("/funcionario/:id/pontos", async (req, res) => {
  const funcionarioId = req.params.id;
  Funcionario.findById(funcionarioId)
    .then((funcionario) => {
      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      Ponto.find({ funcionario })
        .then((pontos) => {
          res.json({ pontos, funcionario });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: "Erro ao buscar pontos do funcionário." });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
