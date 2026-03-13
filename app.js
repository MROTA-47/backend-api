const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

// logs en consola
app.use(logger('dev'));

// parsear datos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ruta principal
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Bienvenido a mi API REST'
  });
});

// puerto del servidor
const port = process.env.PORT || 8000;

// crear servidor
const server = http.createServer(app);

// iniciar servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});