const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const axios = require('axios');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/productos', async (req, res) => {
  const r = await axios.get('https://fakestoreapi.com/products');
  res.json(r.data);
});

app.get('/categorias', async (req, res) => {
  const r = await axios.get('https://fakestoreapi.com/products/categories');
  res.json(r.data);
});

app.get('/usuarios', async (req, res) => {
  const r = await axios.get('https://fakestoreapi.com/users');
  res.json(r.data);
});

app.get('/carritos', async (req, res) => {
  const r = await axios.get('https://fakestoreapi.com/carts');
  res.json(r.data);
});

app.get('/carritodetalle/:id', async (req, res) => {
  const r = await axios.get(`https://fakestoreapi.com/carts/${req.params.id}`);
  res.json(r.data);
});

app.get('/', (req, res) => {
  res.json({
    endpoints: [
      '/productos',
      '/categorias',
      '/usuarios',
      '/carritos',
      '/carritodetalle/:id'
    ]
  });
});

const port = 8000;
http.createServer(app).listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});