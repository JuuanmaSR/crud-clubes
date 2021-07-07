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

const upload = multer({ dest: './uploads/images' });
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/images');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage, limits: { fileSize: 1000000 } });

const exphbs = require('express-handlebars');
const path = require('path');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

let equipos = require('./data/equipos.json');

// Routing
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

app.post('/agregar', (req, res) => {
  console.log(req.body);
  const { nombre, logo, pais } = req.body;
  if (!nombre || !logo || !pais) {
    res.status(400).send('Faltan campos por completar');
    return;
  }
  const newEquipo = {
    id: uuidv4(),
    area: { name: pais },
    name: nombre,
    crestUrl: logo,
    lastUpdate: new Date(),

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
    style: 'ver.css',
  });
});

// Elimiar un equipo
app.get('/eliminar/:id', (req, res) => {
  const equipoId = req.params.id;
  equipos = equipos.filter((equipo) => equipo.id !== equipoId);

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