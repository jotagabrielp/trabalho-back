const mongoose = require("mongoose");

const pontoSchema = new mongoose.Schema({
  funcionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true,
  },
  entrada: {
    type: Date,
    required: true,
  },
  saida: {
    type: Date,
  },
});

module.exports = mongoose.model("Ponto", pontoSchema);
