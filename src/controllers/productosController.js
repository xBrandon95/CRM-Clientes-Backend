const fs = require('fs');
const Producto = require('../models/Producto');

// crear nuevo producto
exports.nuevoProducto = async (req, res, next) => {
  try {
    const producto = new Producto(req.body);

    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }

    await producto.save();
    res.json({ msg: 'Se agrego un nuevo producto' });
  } catch (error) {
    console.log(error);
    next();
  }
};

// mostrar todos los productos
exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    // mostrar los productos
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

// mostrar un producto por su id
exports.mostrarProducto = async (req, res, next) => {
  try {
    const { idProducto } = req.params;
    const producto = await Producto.findOne({ _id: idProducto });

    if (!producto) {
      res.json({ msg: 'Ese producto no existe' });
    }
    // mostrar el producto
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

// actualizar producto por id product
exports.actualizarProducto = async (req, res, next) => {
  try {
    const { idProducto } = req.params;

    // construir nuevo producto
    const nuevoProducto = req.body;
    let borrarImagen = false;

    const productoAnterior = await Producto.findById(idProducto);

    // verificar si hay imagen nueva producto
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
      borrarImagen = true;
    } else {
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    const producto = await Producto.findOneAndUpdate(
      { _id: idProducto },
      nuevoProducto,
      {
        new: true,
      },
    );

    if (borrarImagen) {
      fs.unlinkSync(`./src/uploads/${productoAnterior.imagen}`);
    }
    // mostrar producto actualizado
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

// eliminar producto por id
exports.eliminarProducto = async (req, res, next) => {
  try {
    const { idProducto } = req.params;
    const producto = await Producto.findOne({ _id: idProducto });
    await Producto.findOneAndDelete({ _id: idProducto });
    fs.unlinkSync(`./src/uploads/${producto.imagen}`);
    res.json({ msg: 'Producto Eliminado' });
  } catch (error) {
    console.log(error);
    next();
  }
};
