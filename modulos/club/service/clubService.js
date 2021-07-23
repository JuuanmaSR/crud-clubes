/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */

module.exports = class ClubService {
  /**
   *
   * @param {import('../repository/clubRepository')} ClubRepository
   */
  constructor(ClubRepository) {
    this.clubRepository = ClubRepository;
  }

  async saveEquipo(equipo) {
    return this.clubRepository.save(equipo);
  }

  async updateEquipo(equipo) {
    return this.clubRepository.update(equipo);
  }

  async deleteEquipo(equipoid) {
    return this.clubRepository.delete(equipoid);
  }

  async getAll() {
    return this.clubRepository.getAll();
  }

  async getById(equipoid) {
    return this.clubRepository.getById(equipoid);
  }
};
