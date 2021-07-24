/* eslint-disable import/no-dynamic-require */

const AbstractRepository = require('../../abstractRepository');

/* eslint-disable eqeqeq */
module.exports = class ClubRepository extends AbstractRepository {
  constructor(fileSystem, dbPath) {
    super();
    this.fileSystem = fileSystem;
    this.dbPath = dbPath;
  }

  async save(equipo) {
    const equipos = await this.getData();
    equipos.push(equipo);
    const jsonNewEquipo = JSON.stringify(equipos, null, 2);
    this.saveData(jsonNewEquipo);
  }

  async update(equipo) {
    const equipos = await this.getData();
    const equiposUpdate = equipos.map((dato) => {
      if (dato.id === equipo.id) {
        const result = Object.assign(dato, equipo);
        return result;
      }
      return dato;
    });
    const jsonNewEquipo = JSON.stringify(equiposUpdate, null, 2);
    this.saveData(jsonNewEquipo);
  }

  async delete(equipoid) {
    let equipos = await this.getData();
    equipos = equipos.filter((equipoParam) => equipoParam.id != equipoid);
    const jsonNewEquipo = JSON.stringify(equipos, null, 2);
    this.saveData(jsonNewEquipo);
  }

  async getAll() {
    return this.getData();
  }

  async getById(equipoid) {
    const equipos = await this.getData();
    return equipos.filter((equipoParam) => equipoParam.id == equipoid);
  }

  getData() {
    const content = this.fileSystem.readFileSync(this.dbPath, { encoding: 'utf-8' });
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      parsedContent = [];
    }
    return parsedContent;
  }

  saveData(content) {
    this.fileSystem.writeFileSync(this.dbPath, content, 'utf-8');
  }
};
