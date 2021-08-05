/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-dynamic-require */
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError');
const ClubNotFoundError = require('./error/clubNotFoundError');
const AbstractRepository = require('../../abstractRepository');
const { fromDbToEntity } = require('../mapper/equipoMapper');
/* eslint-disable eqeqeq */
module.exports = class ClubRepository extends AbstractRepository {
  /**
   *
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    super();
    this.databaseAdapter = databaseAdapter;
  }

  /**
  *
  * @param {import('../entidades/equipo')} equipo
  */
  save(equipo) {
    let id;
    const isUpdate = equipo.id;

    if (isUpdate) {
      id = equipo.id;
      const statement = this.databaseAdapter.prepare(
        `UPDATE equipos SET
        ${equipo.crestUrl ? 'crest_url= ?,' : ''}
        area_name = ?,
        name = ?,
        short_name = ?,
        address = ?
        WHERE id = ?
        `);
      const params = [

        equipo.areaName,
        equipo.name,
        equipo.shortName,
        equipo.address,
        equipo.id,
      ];
      if (equipo.crestUrl) {
        params.unshift(equipo.crestUrl);
      }
      statement.run(params);
    } else {
      const statement = this.databaseAdapter.prepare(`
      INSERT INTO equipos(
        area_name,
        name,
        short_name,
        crest_url,
        address
      ) VALUES(?,?,?,?,?)
    `);
      const result = statement.run(
        equipo.areaName,
        equipo.name,
        equipo.shortName,
        equipo.crestUrl,
        equipo.address,
      );
      id = result.lastInsertRowid;
    }
    return this.getById(id);
  }

  delete(equipo) {
    if (!equipo || !equipo.id) {
      throw new ClubIdNotDefinedError('El ID del equipo no esta definido');
    }
    this.databaseAdapter.prepare('DELETE FROM equipos WHERE id= ?').run(equipo.id);
    return true;
  }

  getAll() {
    const equipos = this.databaseAdapter
      .prepare(
        `SELECT 
        id,
        area_name,
        name,
        short_name,
        crest_url,
        address
        FROM equipos`,
      )
      .all();

    return equipos.map((equipoData) => fromDbToEntity(equipoData));
  }

  getById(id) {
    const equipo = this.databaseAdapter
      .prepare(`
      SELECT 
      id,
      area_name,
      name,
      short_name,
      crest_url,
      address
      FROM equipos WHERE id = ?`).get(id);
    if (equipo === undefined) {
      throw new ClubNotFoundError(`No se encontro el equipo con Id: ${id}`);
    }
    return fromDbToEntity(equipo);
  }
};
