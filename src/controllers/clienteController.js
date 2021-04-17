const Cliente = require('../models/Cliente');

// crear un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
  try {
    const clienteRegistrado = await Cliente.findOne({ email: req.body.email });

    if (clienteRegistrado) {
      res.status(400).json({ msg: 'El correo introducido ya existe' });
      next();
    }

    const cliente = new Cliente(req.body);
    await cliente.save();

    res.status(201).json({ msg: 'Se agrego un nuevo cliente', cliente });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Hubo un error' });
    next();
  }
};

// mostrar todos los clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find({});
    res.status(200).json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

// mostrar cliente por su id
exports.mostrarCliente = async (req, res, next) => {
  try {
    const { idCliente } = req.params;
    const cliente = await Cliente.findOne({ _id: idCliente });

    if (!cliente) {
      res.json({ msg: 'El cliente no existe' });
      next();
    }
    // mostrar el cliente
    res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

// actualizar cliente por id
exports.actualizarCliente = async (req, res, next) => {
  try {
    const { idCliente } = req.params;
    const cliente = await Cliente.findOneAndUpdate(
      { _id: idCliente },
      req.body,
      { new: true },
    );
    res.status(200).json({ msg: 'Cliente actualizado correctamente', cliente });
  } catch (error) {
    console.log(error);

    if (error.code && error.code === 11000) {
      res.status(400).json({ msg: 'El correo introducido ya existe' });
      next();
    }

    res.status(400).json({ msg: 'Hubo un error' });
    next();
  }
};

// eliminar cliente por id
exports.eliminarCliente = async (req, res, next) => {
  try {
    const { idCliente } = req.params;

    await Cliente.findOneAndDelete({ _id: idCliente });
    res.status(200).json({ msg: 'Cliente eliminado' });
  } catch (error) {
    console.log(error);
    next();
  }
};
