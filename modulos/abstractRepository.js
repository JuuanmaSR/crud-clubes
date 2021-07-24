/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
const AbstractErrorRepository = require('./error/abstractErrorRepository');

module.exports = class AbstractRepository {
  constructor() {
    if (new.target === AbstractRepository) {
      throw new AbstractErrorRepository('No se puede instanciar el repositorio de clubes abstracto.');
    }
  }

  async save(equipo) {}

  async update(equipo) {}

  async delete(equipoid) {}

  async getAll() {}

  async getById() {}
};
