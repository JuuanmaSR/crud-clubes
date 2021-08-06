/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const EquipoModel = require('./equipoModel');

const sequelizeInstance = new Sequelize('sqlite::memory');

test('Despues de hacerle un setup a Equipo Model y sincronizar el modelo, la tabla Equipos existe', async () => {
  EquipoModel.setup(sequelizeInstance);
  await EquipoModel.sync({ force: true });

  expect(await EquipoModel.findAll()).toEqual([]);
});
