const jwt = require('jsonwebtoken');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const axios = require('axios');
const db = require('./db');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const API_URL = 'https://fakestoreapi.com';

function verificarToken(req, res, next) {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  const token = header.split(' ')[1];

  jwt.verify(token, 'secreto', (err, data) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    next();
  });
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ user: username }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Datos incorrectos' });
  }
});

app.get('/productos', async (req, res) => {
  try {
    const r = await axios.get(`${API_URL}/products`);
    res.json(r.data);
  } catch (error) {
    res.status(500).json({ error: 'Error productos' });
  }
});

app.get('/productos/:id', async (req, res) => {
  try {
    const r = await axios.get(`${API_URL}/products/${req.params.id}`);
    res.json(r.data);
  } catch (error) {
    res.status(500).json({ error: 'Error producto' });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const r = await axios.get(`${API_URL}/users`);
    res.json(r.data);
  } catch (error) {
    res.status(500).json({ error: 'Error usuarios' });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const r = await axios.get(`${API_URL}/users/${req.params.id}`);
    res.json(r.data);
  } catch (error) {
    res.status(500).json({ error: 'Error usuario' });
  }
});

app.get('/carritos', async (req, res) => {
  try {
    const r = await axios.get(`${API_URL}/carts`);
    res.json(r.data);
  } catch (error) {
    res.status(500).json({ error: 'Error carritos' });
  }
});

app.get('/carritos/:id', async (req, res) => {
  try {
    const r = await axios.get(`${API_URL}/carts/${req.params.id}`);
    res.json(r.data);
  } catch (error) {
    res.status(500).json({ error: 'Error carrito' });
  }
});

app.get('/guardar-productos', async (req, res) => {
  try {
    const r = await axios.get(`${API_URL}/products`);

    r.data.forEach(p => {
      const sql = `
        INSERT INTO productos (id, title, price, description, category, image)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        title=VALUES(title),
        price=VALUES(price),
        description=VALUES(description),
        category=VALUES(category),
        image=VALUES(image)
      `;

      db.query(sql, [
        p.id,
        p.title,
        p.price,
        p.description,
        p.category,
        p.image
      ]);
    });

    res.json({ mensaje: 'Todos los productos guardados ' });

  } catch (error) {
    res.status(500).json({ error: 'Error guardando productos' });
  }
});

app.get('/guardar-productos/:id', async (req, res) => {
  try {
    const r = await axios.get(`${API_URL}/products/${req.params.id}`);
    const p = r.data;

    const sql = `
      INSERT INTO productos (id, title, price, description, category, image)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      title=VALUES(title),
      price=VALUES(price),
      description=VALUES(description),
      category=VALUES(category),
      image=VALUES(image)
    `;

    db.query(sql, [
      p.id,
      p.title,
      p.price,
      p.description,
      p.category,
      p.image
    ]);

    res.json({ mensaje: `Producto ${p.id} guardado 🔥` });

  } catch (error) {
    res.status(500).json({ error: 'Error guardando producto' });
  }
});

app.get('/productos-db', verificarToken, (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error BD' });
    }
    res.json(results);
  });
});

app.get('/productos-db/:id', verificarToken, (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error BD' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No encontrado' });
    }

    res.json(results[0]);
  });
});

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API COMPLETA ',
    endpoints: [
      '/login',
      '/productos',
      '/productos/:id',
      '/usuarios',
      '/usuarios/:id',
      '/carritos',
      '/carritos/:id',
      '/guardar-productos',
      '/guardar-productos/:id',
      '/productos-db',
      '/productos-db/:id'
    ]
  });
});

const port = 8000;

http.createServer(app).listen(port, () => {
  console.log(`http://localhost:${port}`);
});