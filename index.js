/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './uploads/images' });
const exphbs = require('express-handlebars');
const path = require('path');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(`${__dirname}/public`)));
app.use(express.static(`${__dirname}/uploads`));

const equipos = require('./data/equipos.json');

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
  res.render('agregar', {
    layout: 'index',
  });
});

//
app.get('/equipo/:id/ver', (req, res) => {
  res.render('ver', {
    layout: 'index',
    style: 'ver.css',
  });
});
app.listen(8080);
console.log(`Escuchando en el puerto ${PUERTO}`);