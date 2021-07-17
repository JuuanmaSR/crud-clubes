/* eslint-disable eqeqeq */
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let equipos = require('../data/equipos.json');
const Equipo = require('../entidades/equipo');

const clubIndex = (req, res) => {
  res.render('crudClubes/inicio', {
    layout: 'index',
    style: 'inicio.css',
    equipos,
  });
};

const clubDetails = (req, res) => {
  const equipoId = req.params.id;
  const equipo = equipos.filter((equipoParam) => equipoParam.id == equipoId);

  try {
    res.render('crudClubes/ver', {
      layout: 'index',
      style: 'verEquipo.css',
      equipo,
    });
  } catch (error) {
    res.status(404).send('Page /ver not found');
  }
};

const clubCreateGet = (req, res) => {
  try {
    res.render('crudClubes/agregar', {
      layout: 'index',
      style: 'agregar.css',
    });
  } catch (error) {
    res.status(400).send('Page /agregar not found');
  }
};

const clubCreatePost = (req, res) => {
  try {
    const { nombre, pais, ubicacion } = req.body;
    if (!nombre || !pais || !ubicacion) {
      res.status(400).send('Faltan campos por completar');
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
    res.redirect('/crudClubes');
  } catch (error) {
    res.status(400).send('Invalid JSON string to create a new club');
  }
};

const clubUpdateGet = (req, res) => {
  const equipoId = req.params.id;
  try {
    res.render('crudClubes/editar', {
      layout: 'index',
      style: 'editar.css',
      id: equipoId,
    });
  } catch (error) {
    res.status(400).send('Page /editar not found');
  }
};

const clubUpdatePut = (req, res) => {
  const equipoId = req.params.id;
  try {
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
      if (dato.id === equipoId) {
        const result = Object.assign(dato, newEquipo);
        return result;
      }
      return dato;
    });
    const jsonNewEquipo = JSON.stringify(equiposUpdate, null, 2);
    fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
    res.redirect('/crudClubes');
  } catch (error) {
    res.status(400).send('Invalid JSON string to update a specific club');
  }
};

const clubDelete = (req, res) => {
  const equipoId = req.params.id;
  try {
    equipos = equipos.filter((equipoParam) => equipoParam.id != equipoId);
    const jsonNewEquipo = JSON.stringify(equipos, null, 2);
    fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
    res.redirect('/crudClubes');
  } catch (error) {
    res.status(400).send("Delete function is don't work");
  }
};

module.exports = {
  clubIndex,
  clubDetails,
  clubCreateGet,
  clubCreatePost,
  clubDelete,
  clubUpdateGet,
  clubUpdatePut,
};
