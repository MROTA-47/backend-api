const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Bienvenido a mi API REST'
  });
});

const port = 8000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});