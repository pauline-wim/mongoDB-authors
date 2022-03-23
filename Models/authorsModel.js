const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  books: {
    type: Array,
    required: true,
  },
});

// créer un modèle
const Authors = mongoose.model("Authors", authorsSchema);

// exporter le modèle
module.exports = Authors;
