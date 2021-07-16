/* eslint-disable no-unused-expressions */
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
const methodOverride = require('method-override');
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
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Static files
app.use(express.static(path.join(`${__dirname}/views`)));
app.use(express.static(path.join(`${__dirname}/uploads`)));
app.use(express.static(path.resolve(`${__dirname}/public`)));

let equipos = require('./data/equipos.json');
const Equipo = require('./entidades/equipo');
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
  const { nombre, pais, ubicacion } = req.body;
  if (!nombre || !pais || !ubicacion) {
    res.status(400).send('Faltan campos por completar');
    return;
  }

  const newEquipo = new Equipo(
    uuidv4(),
    pais,
    nombre,
    `/images/${req.file.filename}`,
    ubicacion,
    Date(),

  );
  equipos.push(newEquipo);
  const jsonNewEquipo = JSON.stringify(equipos, null, 2);
  fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
  res.redirect('/');
});

// Ver un equipo
app.get('/ver/:id', (req, res) => {
  const equipoId = req.params.id;
  const equipo = equipos.filter((equipoParam) => equipoParam.id == equipoId);

  res.render('ver', {
    layout: 'index',
    style: 'verEquipo.css',
    equipo,
  });
});

// Elimiar un equipo
app.get('/eliminar/:id', (req, res) => {
  const equipoId = req.params.id;

  equipos = equipos.filter((equipoParam) => equipoParam.id != equipoId);
  const jsonNewEquipo = JSON.stringify(equipos, null, 2);
  fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
  res.redirect('/');
});

// Editar un equipo
app.get('/editar/:id', (req, res) => {
  const equipoId = req.params.id;
  res.render('editar', {
    layout: 'index',
    style: 'editar.css',
    id: equipoId,
  });
});

app.put('/editar/:id', upload.single('imagen'), (req, res) => {
  const equipoId = req.params.id;

  const { nombre, pais, ubicacion } = req.body;
  if (!nombre || !pais || !ubicacion) {
    res.status(400).send('Faltan campos por completar');
    return;
  }

  const newEquipo = new Equipo(
    equipoId,
    pais,
    nombre,
    `/images/${req.file.filename}`,
    ubicacion,
    Date(),
  );
  const equiposUpdate = equipos.map((dato) => {
    if (dato.id == equipoId) {
      const result = Object.assign(dato, newEquipo);
      return result;
    }
    return dato;
  });
  const jsonNewEquipo = JSON.stringify(equiposUpdate, null, 2);
  fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
  res.redirect('/');
});

app.listen(PUERTO);
console.log(`Escuchando en el puerto ${PUERTO}`);
app.use((req, res) => {
  res.status(404);
  res.send('404 Not found');
});