const { Router } = require('express');
const {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
} = require('../controllers/clienteController');

const router = Router();

// agregar nuevo cliente
router.post('/clientes', nuevoCliente);

// mostrar clientes
router.get('/clientes', mostrarClientes);

// mostrar un cliente
router.get('/clientes/:idCliente', mostrarCliente);

// actualizar cliente
router.put('/clientes/:idCliente', actualizarCliente);

// eliminar cliente
router.delete('/clientes/:idCliente', eliminarCliente);

module.exports = router;
