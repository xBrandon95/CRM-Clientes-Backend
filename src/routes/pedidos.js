const { Router } = require('express');
const {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  actualizarPedido,
  eliminarPedido,
} = require('../controllers/pedidoController');

const router = Router();

// nuevo pedido
router.post('/', nuevoPedido);

// mostrar los pedidos
router.get('/', mostrarPedidos);

// mostrar un pedido por Id
router.get('/:idPedido', mostrarPedido);

// actualizar pedidos
router.put('/:idPedido', actualizarPedido);

// eliminar pedidos
router.delete('/:idPedido', eliminarPedido);

module.exports = router;
