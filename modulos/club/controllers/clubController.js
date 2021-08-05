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
      req.session.errors = [error.message];
      res.redirect('/crudClubes');
    }
  }

  clubCreateGet(req, res) {
    try {
      res.render('crudClubes/form', {
        layout: 'index',
        style: 'form.css',
        title: 'Crear un equipo',
      });
    } catch (error) {
      req.session.errors = [error.message];
      res.redirect('/crudClubes');
    }
  }

  async clubUpdateGet(req, res) {
    const { id } = req.params;
    const equipo = await this.clubService.getById(id);
    try {
      res.render('crudClubes/form', {
        layout: 'index',
        style: 'form.css',
        title: 'Actualizar un equipo',
        id,
        equipo,
      });
    } catch (error) {
      req.session.errors = [error.message, error.stack];
      res.redirect('/crudClubes');
    }
  }

  async clubSave(req, res) {
    try {
      const equipo = fromDataToEntity(req.body);
      if (req.file) {
        const path = `/images/${req.file.filename}`;
        equipo.crestUrl = path;
      }

      const equipoCreado = await this.clubService.saveEquipo(equipo);
      if (equipo.id) {
        req.session.messages = [`El equipo ${equipo.name} se actualizo correctamente`];
      } else {
        req.session.messages = [`El equipo: ${equipoCreado.name} con id: ${equipoCreado.id} se creo correctamente`];
      }
      res.redirect('/crudClubes');
    } catch (error) {
      req.session.errors = [error.message, error.stack];
      res.redirect('/crudClubes');
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
