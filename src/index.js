const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const dbConnection = require('./config/db');

dotenv.config();

// crear el servidor
const app = express();

// carpeta publica
app.use(express.static('src/uploads'));

// habilitando json
app.use(express.json());

// Definir dominio para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: (origin, callback) => {
    // revisar la peticion
    const existe = whitelist.some(dominio => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por cors'));
    }
  },
};

// habilitando colors
app.use(cors(corsOptions));

// coneccion a la base de datos
dbConnection();

// utilizando morgan
app.use(morgan('dev'));

// rutas de la app
app.use('/api', require('./routes/usuarios'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/pedidos', require('./routes/pedidos'));

// definiendo el puerto y hoste
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
