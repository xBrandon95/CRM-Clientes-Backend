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
router.post('/', nuevoCliente);

// mostrar clientes
router.get('/', mostrarClientes);

// mostrar un cliente
router.get('/:idCliente', mostrarCliente);

// actualizar cliente
router.put('/:idCliente', actualizarCliente);

// eliminar cliente
router.delete('/:idCliente', eliminarCliente);

module.exports = router;
