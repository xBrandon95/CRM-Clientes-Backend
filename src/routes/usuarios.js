const { Router } = require('express');
const {
  autenticarUsuario,
  registrarUsuario,
} = require('../controllers/usuarioController');

const router = Router();

// agregar nuevo cliente
router.post('/crear-cuenta', registrarUsuario);

// mostrar clientes
router.post('/iniciar-sesion', autenticarUsuario);

module.exports = router;
