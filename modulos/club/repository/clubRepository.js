/* eslint-disable import/no-dynamic-require */
/* eslint-disable eqeqeq */
const fs = require('fs');

const DB_PATH = process.env.JSON_DB_PATH;
let equipos = require(`../../../${DB_PATH}`);

const save = (equipo) => {
  equipos.push(equipo);
  const jsonNewEquipo = JSON.stringify(equipos, null, 2);
  fs.writeFileSync(DB_PATH, jsonNewEquipo, 'utf-8');
};

const update = (equipo) => {
  const equiposUpdate = equipos.map((dato) => {
    if (dato.id === equipo.id) {
      const result = Object.assign(dato, equipo);
      return result;
    }
    return dato;
  });
  const jsonNewEquipo = JSON.stringify(equiposUpdate, null, 2);
  fs.writeFileSync(DB_PATH, jsonNewEquipo, 'utf-8');
};
const deletes = (equipoid) => {
  equipos = equipos.filter((equipoParam) => equipoParam.id != equipoid);
  const jsonNewEquipo = JSON.stringify(equipos, null, 2);
  fs.writeFileSync(DB_PATH, jsonNewEquipo, 'utf-8');
};
const getAll = () => equipos;

const getById = (equipoid) => equipos.filter((equipoParam) => equipoParam.id == equipoid);

module.exports = {
  save,
  update,
  deletes,
  getAll,
  getById,
};
