const { Schema, model } = require('mongoose');

const productoSchema = Schema({
  nombre: {
    type: String,
    trim: true,
  },
  precio: {
    type: String,
    trim: true,
  },
  imagen: {
    type: String,
  },
});

module.exports = model('Producto', productoSchema);
