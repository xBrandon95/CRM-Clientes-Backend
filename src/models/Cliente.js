const { Schema, model } = require('mongoose');

const clienteSchema = Schema({
  nombre: {
    type: 'string',
    trim: true,
  },
  apellido: {
    type: 'string',
    trim: true,
  },
  empresa: {
    type: 'string',
    trim: true,
  },
  email: {
    type: 'string',
    unique: true,
    lowercase: true,
    trim: true,
  },
  telefono: {
    type: 'string',
    trim: true,
  },
});

module.exports = model('Cliente', clienteSchema);
