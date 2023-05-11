const mongoose = require("mongoose");

const funcionarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  dataCadastro: { type: Date, default: Date.now },
});

const Funcionario = mongoose.model("Funcionario", funcionarioSchema);

module.exports = Funcionario;
