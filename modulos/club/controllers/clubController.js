/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const AbstractController = require('../../abstractController');
const ClubIdNotDefinedError = require('./error/ClubIdNotDefinedError');
const { fromDataToEntity } = require('../mapper/equipoMapper');

module.exports = class ClubController extends AbstractController {
  /**
   * @param {import('../service/clubService')} ClubService
   */
  constructor(ClubService) {
    super();
    this.clubService = ClubService;
  }

  async clubIndex(req, res) {
    const equipos = await this.clubService.getAll();
    const { messages, errors } = req.session;
    res.render('crudClubes/inicio', {
      layout: 'index',
      style: 'inicio.css',
      equipos,
      messages,
      errors,
    });
    req.session.messages = [];
    req.session.errors = [];
  }

  async clubDetails(req, res) {
    const { id } = req.params;
    if (id === undefined) {
      throw new ClubIdNotDefinedError();
    }
    try {
      const equipo = await this.clubService.getById(id);
      res.render('crudClubes/ver', {
        layout: 'index',
        style: 'verEquipo.css',
        equipo,
      });
    } catch (error) {
      res.status(404).send('Page /ver not found');
    }
  }

  clubCreateGet(req, res) {
    try {
      res.render('crudClubes/form', {
        layout: 'index',
        style: 'agregar.css',
        title: 'Crear un equipo',
      });
    } catch (error) {
      res.status(400).send('Page /agregar not found');
    }
  }

  async clubSave(req, res) {
    try {
      const { name, area_name, address } = req.body;
      if (!name || !area_name || !address) {
        res.status(400).send('Faltan campos por completar');
      }
      const newEquipo = fromDataToEntity(
        area_name,
        name,
        `/images/${req.file.filename}`,
        address,
      );
      await this.clubService.saveEquipo(newEquipo);
      req.session.messages = [`El equipo ${name} con id ${newEquipo.id} se creo correctamente!`];
    } catch (error) {
      req.session.errors = ['El equipo no se pudo crear correctamente'];
    }
    res.redirect('/crudClubes');
  }

  async clubUpdateGet(req, res) {
    const { id } = req.params;
    try {
      res.render('crudClubes/form', {
        layout: 'index',
        style: 'editar.css',
        title: 'Actualizar un equipo',
        id,
      });
    } catch (error) {
      res.status(400).send('Page /editar not found');
    }
  }

  async clubDelete(req, res) {
    try {
      const { id } = req.params;
      const equipo = await this.clubService.getById(id);
      await this.clubService.deleteEquipo(equipo);
      req.session.messages = [`El equipo ${equipo.name} con id ${id} se elimino correctamente!`];
    } catch (error) {
      req.session.errors = ['No se pudo eliminar el equipo', error.message];
    }
    res.redirect('/crudClubes');
  }
};
