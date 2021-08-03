/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
const AbstractErrorRepository = require('./error/abstractErrorRepository');
const MethodNotImplementedError = require('./club/repository/error/MethodNotImplementedError');

module.exports = class AbstractRepository {
  constructor() {
    if (new.target === AbstractRepository) {
      throw new AbstractErrorRepository('No se puede instanciar el repositorio de clubes abstracto.');
    }
  }

  async save(equipo) {
    throw new MethodNotImplementedError();
  }

  async delete(id) {
    throw new MethodNotImplementedError();
  }

  async getAll() {
    throw new MethodNotImplementedError();
  }

  async getById() {
    throw new MethodNotImplementedError();
  }
};
