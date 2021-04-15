const Pedido = require('../models/Pedido');

// crear nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();

    res.json({ msg: 'Se agrego nuevo pedido' });
  } catch (error) {
    console.log(error);
    next();
  }
};

// muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({})
      .populate('cliente')
      .populate({ path: 'pedido.producto', model: 'Producto' });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

// mostrar pedido por Id
exports.mostrarPedido = async (req, res, next) => {
  try {
    const { idPedido } = req.params;
    const pedido = await Pedido.findOne({ _id: idPedido })
      .populate('cliente')
      .populate({ path: 'pedido.producto', model: 'Producto' });

    if (!pedido) {
      res.json({ msg: 'Ese pedido no existe' });
      next();
    }
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

// actualizar pedido por Id
exports.actualizarPedido = async (req, res, next) => {
  try {
    const { idPedido } = req.params;
    const pedido = await Pedido.findByIdAndUpdate({ _id: idPedido }, req.body, {
      new: true,
    })
      .populate('cliente')
      .populate({ path: 'pedido.producto', model: 'Producto' });

    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Eliminar Pedido
exports.eliminarPedido = async (req, res, next) => {
  try {
    const { idPedido } = req.params;
    await Pedido.findOneAndDelete({ _id: idPedido });
    res.json({ msg: 'El pedido se ha eliminado' });
  } catch (error) {
    console.log(error);
    next();
  }
};
