/* eslint-disable no-undef */
const ClubService = require('../clubService');
const ClubNotDefinedError = require('../error/ClubNotDefinedError');
const ClubIdNotDefinedError = require('../error/ClubIdNotDefinedError');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),

};

const service = new ClubService(repositoryMock);

test('saveEquipo llama al método save del repositorio solo 1 vez', () => {
  service.saveEquipo({});
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
});

test('Llamar a saveEquipo sin pasar un equipo da un error especifico', async () => {
  await expect(service.saveEquipo).rejects.toThrowError(ClubNotDefinedError);
});
test('deleteEquipo llama al metodo delete del respositorio solo 1 vez', () => {
  service.deleteEquipo({});
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
});

test('Llamar a deleteEquipo sin pasar un id da un error especifico', async () => {
  await expect(service.deleteEquipo).rejects.toThrowError(ClubIdNotDefinedError);
});

test('getById llama al metodo getById del repositorio solo 1 vez', () => {
  service.getById({});
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('Llamar a getById sin pasar un id da un error especifico', async () => {
  await expect(service.getById).rejects.toThrowError(ClubIdNotDefinedError);
});

test('getAll llama al metodo getAll del repositorio solo 1 vez', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
