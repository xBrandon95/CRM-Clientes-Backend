const { Router } = require('express');
const { subirArchivo } = require('../config/multer');
const {
  nuevoProducto,
  mostrarProductos,
  mostrarProducto,
  actualizarProducto,
  eliminarProducto,
  buscarProducto,
} = require('../controllers/productosController');

const router = Router();

// agregar nuevo producto
router.post('/', subirArchivo, nuevoProducto);

// mostrar productos
router.get('/', mostrarProductos);

// mostrar producto por id
router.get('/:idProducto', mostrarProducto);

// actualizar producto por id
router.put('/:idProducto', subirArchivo, actualizarProducto);

// eliminar producto por id
router.delete('/:idProducto', eliminarProducto);

// busqueda de productos
router.post('/busqueda/:query', buscarProducto);

module.exports = router;
