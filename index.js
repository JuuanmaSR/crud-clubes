/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */

const fs = require('fs');
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Storage Settings
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/images');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      return cb(null, true);
    }
    cb('Error: Solo se soportan imagenes!');
  },
});

const exphbs = require('express-handlebars');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
// Settings
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Static files
app.use(express.static(path.join(`${__dirname}/views`)));
app.use(express.static(path.join(`${__dirname}/uploads`)));
app.use(express.static(path.resolve(`${__dirname}/public`)));

let equipos = require('./data/equipos.json');
// Routes
app.get('/', (req, res) => {
  res.render('inicio', {
    layout: 'index',
    style: 'inicio.css',
    equipos,
  });
});

// Agregar
app.get('/agregar', (req, res) => {
  res.render('agregar', {
    layout: 'index',
    style: 'agregar.css',
  });
});

app.post('/agregar', upload.single('imagen'), (req, res) => {
  const { nombre, pais } = req.body;
  if (!nombre || !pais) {
    res.status(400).send('Faltan campos por completar');
    return;
  }
  const newEquipo = {
    id: uuidv4(),
    area: { name: pais },
    name: nombre,
    crestUrl: `/images/${req.file.filename}`,
    lastUpdate: Date(),

  };
  equipos.push(newEquipo);
  const jsonNewEquipo = JSON.stringify(equipos, null, 2);
  fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
  res.redirect('/');
});

// Ver un equipo
app.get('/ver/:id', (req, res) => {
  res.render('ver', {
    layout: 'index',
    style: 'verEquipo.css',
  });
});

// Elimiar un equipo
app.get('/eliminar/:id', (req, res) => {
  const equipoId = req.params.id;

  equipos = equipos.filter((equipo) => equipo.id != equipoId);
  const jsonNewEquipo = JSON.stringify(equipos, null, 2);
  fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
  res.redirect('/');
});

app.listen(8080);
console.log(`Escuchando en el puerto ${PUERTO}`);
app.use((req, res) => {
  res.status(404);
  res.send('404 Not found');
});