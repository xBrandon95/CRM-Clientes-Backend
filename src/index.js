const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/db');

dotenv.config();

// crear el servidor
const app = express();

// habilitando json
app.use(express.json());

// coneccion a la base de datos
dbConnection();

// utilizando morgan
app.use(morgan('dev'));

// rutas de la app
app.use('/api/', require('./routes'));

// definiendo el puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
