/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './uploads/images' });
const exphbs = require('express-handlebars');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  res.render('inicio', {
    layout: 'home',
  });
});

app.listen(8080);
console.log(`Escuchando en el puerto ${PUERTO}`);