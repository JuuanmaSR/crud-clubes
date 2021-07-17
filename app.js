/* eslint-disable no-console */
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const exphbs = require('express-handlebars');
const crudRoutes = require('./routes/crud-routes');

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
// Crud-Routes
app.use('/crudClubes', crudRoutes);

app.listen(PUERTO);
console.log(`Escuchando en el puerto ${PUERTO}`);
// 404 Page was not found
app.use((req, res) => {
  res.status(404);
  res.render('error404view', {
    layout: 'index',
  });
});
