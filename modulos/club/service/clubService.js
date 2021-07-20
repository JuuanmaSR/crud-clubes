/* eslint-disable eqeqeq */
const fs = require('fs');
let equipos = require('../../../data/equipos.json');

const saveEquipo = (equipo) => {
  equipos.push(equipo);
  const jsonNewEquipo = JSON.stringify(equipos, null, 2);
  fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
};

const updateEquipo = (equipo) => {
  const equiposUpdate = equipos.map((dato) => {
    if (dato.id === equipo.id) {
      const result = Object.assign(dato, equipo);
      return result;
    }
    return dato;
  });
  const jsonNewEquipo = JSON.stringify(equiposUpdate, null, 2);
  fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
};

const deleteEquipo = (equipoid) => {
  equipos = equipos.filter((equipoParam) => equipoParam.id != equipoid);
  const jsonNewEquipo = JSON.stringify(equipos, null, 2);
  fs.writeFileSync('./data/equipos.json', jsonNewEquipo, 'utf-8');
};

const getAll = () => equipos;
const getById = (equipoid) => equipos.filter((equipoParam) => equipoParam.id == equipoid);

module.exports = {
  saveEquipo,
  updateEquipo,
  deleteEquipo,
  getAll,
  getById,
};
