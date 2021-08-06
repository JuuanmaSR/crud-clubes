/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-dynamic-require */
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError');
const ClubNotFoundError = require('./error/clubNotFoundError');
const AbstractRepository = require('../../abstractRepository');
const { fromModelToEntity } = require('../mapper/equipoMapper');
/* eslint-disable eqeqeq */
module.exports = class ClubRepository extends AbstractRepository {
  /**
  *
  * @param {typeof import('../model/equipoModel')} EquipoModel
  */
  constructor(EquipoModel) {
    super();
    this.equipoModel = EquipoModel;
  }

  /**
   *
   * @param {import('../entidades/equipo')} equipo
   * @returns {Promise<import('../entidades/equipo')>}
   */
  async save(equipo) {
    let equipoModel;

    const buildOptions = { isNewRecord: !equipo.id };
    equipoModel = this.equipoModel.build(equipo, buildOptions);
    equipoModel = await equipoModel.save();

    return fromModelToEntity(equipoModel);
  }

  /**
  *
  * @param {import('../entidades/equipo')} equipo
  * @returns {Promise<Boolean>}
  */
  async delete(equipo) {
    if (!equipo || !equipo.id) {
      throw new ClubIdNotDefinedError();
    }

    return Boolean(await this.equipoModel.destroy({ where: { id: equipo.id } }));
  }

  /**
   *
   * @param {Number} id
   */
  async getById(id) {
    const equipoModel = await this.equipoModel.findOne({
      where: { id }
    });

    if (!equipoModel) {
      throw new ClubNotFoundError(`No se encontro el equipo con id: ${id}`);
    }

    return fromModelToEntity(equipoModel);
  }

  async getAll() {
    const equipos = await this.equipoModel.findAll();
    return equipos.map(fromModelToEntity);
  }
};
