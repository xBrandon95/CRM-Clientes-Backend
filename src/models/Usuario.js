const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

module.exports = model('Usuario', usuarioSchema);
