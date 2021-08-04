/* eslint-disable no-undef */
const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const clubIdNotDefinedError = require('../error/clubIdNotDefinedError');
const clubNotFoundError = require('../error/clubNotFoundError');
const ClubRepository = require('../clubRepository');
const Equipo = require('../../entidades/equipo');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:');
  const migration = fs.readFileSync('./modulos/configDI/setup.sql', 'utf-8');
  mockDb.exec(migration);
});

test('Guardar un equipo nuevo genera un id', () => {
  const reporsitory = new ClubRepository(mockDb);
  const equipo = reporsitory.save(
    new Equipo({
      areaName: 'areaName',
      name: 'name',
      shortName: 'shortName',
      crestUrl: 'crestUrl',
      address: 'address',
    }),
  );

  expect(equipo.id).toEqual(1);
});

test('Guardar un equipo existente actualiza los valores', () => {
  const reporsitory = new ClubRepository(mockDb);
  let equipo = reporsitory.save(
    new Equipo({
      areaName: 'areaName',
      name: 'name',
      shortName: 'shortName',
      crestUrl: 'crestUrl',
      address: 'address',
    }),
  );
  expect(equipo.id).toEqual(1);
  expect(equipo.areaName).toEqual('areaName');
  equipo = reporsitory.save(
    new Equipo({
      id: 1,
      areaName: 'new area name',
      name: 'name',
      shortName: 'shortName',
      crestUrl: 'crestUrl',
      address: 'address',
    }),
  );
  expect(equipo.id).toEqual(1);
  expect(equipo.areaName).toEqual('new area name');
});

test('Intentar guardar un equipo con un id que no existe da error', () => {
  const reporsitory = new ClubRepository(mockDb);
  expect(() => {
    reporsitory.save(
      new Equipo({
        id: 1,
        areaName: 'new area name',
        name: 'name',
        shortName: 'shortName',
        crestUrl: 'crestUrl',
        address: 'address',
      }),
    );
  }).toThrowError(clubNotFoundError);
});

test('Eliminar un equipo elimina un equipo existente', () => {
  const reporsitory = new ClubRepository(mockDb);
  const newEquipo = reporsitory.save({
    areaName: 'areaName',
    name: 'name',
    shortName: 'shortName',
    crestUrl: 'crestUrl',
    address: 'address',
  });
  expect(newEquipo.id).toEqual(1);
  expect(reporsitory.delete(newEquipo)).toBe(true);
  expect(() => {
    reporsitory.getById(1);
  }).toThrowError(clubNotFoundError);
});

test('eliminar un equipo sin id da error', () => {
  const reporsitory = new ClubRepository(mockDb);
  expect(() => {
    reporsitory.delete({});
  }).toThrowError(clubIdNotDefinedError);
});

test('Obtener todo los equipos devuelve un array de entidades equipo', () => {
  const reporsitory = new ClubRepository(mockDb);
  expect(reporsitory.getAll()).toEqual([]);

  const equipoPruebaUno = reporsitory.save(
    new Equipo({
      areaName: 'areaName',
      name: 'name',
      shortName: 'shortName',
      crestUrl: 'crestUrl',
      address: 'address',
    }),
  );
  const equipoPruebaDos = reporsitory.save(
    new Equipo({
      areaName: 'newAreaName',
      name: 'newName',
      shortName: 'newShortName',
      crestUrl: 'newCrestUrl',
      address: 'newAddress',
    }),
  );

  expect(reporsitory.getAll()).toEqual([equipoPruebaUno, equipoPruebaDos]);
});

test('Buscar un equipo por id devuelve un equipo adecuado', () => {
  const reporsitory = new ClubRepository(mockDb);
  const nuevoEquipo = reporsitory.save(
    new Equipo({
      areaName: 'areaName',
      name: 'name',
      shortName: 'shortName',
      crestUrl: 'crestUrl',
      address: 'address',
    }),
  );
  expect(nuevoEquipo.id).toEqual(1);
  const equipo = reporsitory.getById(nuevoEquipo.id);
  expect(equipo).toEqual(nuevoEquipo);
});

test('Buscar un equipo con un id que no existe da error', () => {
  const reporsitory = new ClubRepository(mockDb);
  expect(() => {
    reporsitory.getById(1);
  }).toThrowError(clubNotFoundError);
});
