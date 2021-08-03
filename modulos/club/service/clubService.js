/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
const ClubIdNotDefinedError = require('./error/ClubIdNotDefinedError');
const ClubNotDefinedError = require('./error/ClubNotDefinedError');
/**
 * @typedef {import('../../abstractRepository')} AbstractRepository
 */
module.exports = class ClubService {
  /**
   *
   * @param {AbstractRepository} ClubRepository
   */
  constructor(ClubRepository) {
    this.clubRepository = ClubRepository;
  }

  async saveEquipo(equipo) {
    if (equipo === undefined) {
      throw new ClubNotDefinedError();
    }
    return this.clubRepository.save(equipo);
  }

  async deleteEquipo(equipoid) {
    if (equipoid === undefined) {
      throw new ClubIdNotDefinedError();
    }
    return this.clubRepository.delete(equipoid);
  }

  async getById(equipoid) {
    if (equipoid === undefined) {
      throw new ClubIdNotDefinedError();
    }
    return this.clubRepository.getById(equipoid);
  }

  async getAll() {
    return this.clubRepository.getAll();
  }
};
