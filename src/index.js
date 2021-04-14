const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/db');

// crear el servidor
const app = express();
dotenv.config();

// coneccion a la base de datos
dbConnection();

// utilizando morgan
app.use(morgan('dev'));

// rutas de la app
app.use(require('./routes'));

// definiendo el puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
