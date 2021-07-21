/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const { v4: uuidv4 } = require('uuid');
const { fromDataToEntity } = require('../mapper/equipoMapper');

module.exports = function (serviceLocator) {
  const clubService = serviceLocator.get('clubService');
  return {
    clubIndex: (req, res) => {
      const equipos = clubService.getAll();
      res.render('crudClubes/inicio', {
        layout: 'index',
        style: 'inicio.css',
        equipos,
      });
    },
    clubDetails: (req, res) => {
      const equipoId = req.params.id;
      const equipo = clubService.getById(equipoId);
      try {
        res.render('crudClubes/ver', {
          layout: 'index',
          style: 'verEquipo.css',
          equipo,
        });
      } catch (error) {
        res.status(404).send('Page /ver not found');
      }
    },
    clubCreateGet: (req, res) => {
      try {
        res.render('crudClubes/agregar', {
          layout: 'index',
          style: 'agregar.css',
        });
      } catch (error) {
        res.status(400).send('Page /agregar not found');
      }
    },
    clubCreatePost: (req, res) => {
      try {
        const { name, area_name, address } = req.body;
        if (!name || !area_name || !address) {
          res.status(400).send('Faltan campos por completar');
        }
        const newEquipo = fromDataToEntity(
          uuidv4(),
          area_name,
          name,
          `/images/${req.file.filename}`,
          address,
          Date(),
        );
        clubService.saveEquipo(newEquipo);
        res.redirect('/crudClubes');
      } catch (error) {
        res.status(400).send('Invalid JSON string to create a new club');
      }
    },
    clubUpdateGet: (req, res) => {
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
    },
    clubUpdatePut: (req, res) => {
      const equipoId = req.params.id;
      try {
        const { name, area_name, address } = req.body;
        if (!name || !area_name || !address) {
          res.status(400).send('Faltan campos por completar');
        }
        const newEquipo = fromDataToEntity(
          equipoId,
          area_name,
          name,
          `/images/${req.file.filename}`,
          address,
          Date(),
        );
        clubService.updateEquipo(newEquipo);
        res.redirect('/crudClubes');
      } catch (error) {
        res.status(400).send('Invalid JSON string to update a specific club');
      }
    },
    clubDelete: (req, res) => {
      const equipoId = req.params.id;
      try {
        clubService.deleteEquipo(equipoId);
        res.redirect('/crudClubes');
      } catch (error) {
        res.status(400).send("Delete function is don't work");
      }
    },
  };
};
