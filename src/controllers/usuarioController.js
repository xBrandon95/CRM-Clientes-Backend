const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.registrarUsuario = async (req, res) => {
  try {
    // leer los datos del usuario
    const usuario = new Usuario(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    await usuario.save();
    res.json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    console.log(error);
    res.json({ msg: 'Hubo un error' });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  try {
    // buscar el usuario
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      // Si el usuario existe verificar el password
      if (bcrypt.compareSync(password, usuario.password)) {
        // Password correcto firmar el token
        const token = jwt.sign(
          {
            id: usuario._id,
            email: usuario.email,
            nombre: usuario.nombre,
          },
          'CLAVESECRETA',
          { expiresIn: 60 * 60 * 2 },
        );

        res.json({ token });
      } else {
        // Si el password es incorrecto
        res.status(401).json({ msg: 'Password incorrecto' });
        next();
      }
    } else {
      // Si el usuario no existe
      res.status(401).json({ msg: 'Ese usuario no existe' });
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
