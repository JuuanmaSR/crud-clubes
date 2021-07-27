/* eslint-disable max-len */
/* eslint-disable no-undef */
const ClubController = require('../clubController');
const ClubIdNotDefinedError = require('../error/ClubIdNotDefinedError');
const Equipo = require('../../entidades/equipo');

const uuidv4 = {
  single: jest.fn(),
};
const serviceMock = {
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
  saveEquipo: jest.fn(() => Promise.resolve({})),
  updateEquipo: jest.fn(() => Promise.resolve({})),
  deleteEquipo: jest.fn(),
};
const controller = new ClubController(serviceMock, uuidv4);

test('clubIndex renderea el inicio', async () => {
  const renderMock = jest.fn();
  await controller.clubIndex(
    { session: { errors: [], messages: [] } }, { render: renderMock },
    {
      layout: '',
      style: '',
    },
  );
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('crudClubes/inicio', {
    layout: 'index',
    style: 'inicio.css',
    equipos: [],
    messages: [],
    errors: [],
  });
});

test('clubDetails sin ID da un error', async () => {
  expect(controller.clubDetails({ params: {} })).rejects.toThrowError(ClubIdNotDefinedError);
});

test('clubDetails obtiene ID del club y lo renderea', async () => {
  const idMock = 1;
  const renderMock = jest.fn();
  serviceMock.getById.mockImplementationOnce(() => ({}));
  await controller.clubDetails({ params: { id: idMock } }, { render: renderMock });
  expect(serviceMock.getById).toHaveBeenCalledWith(idMock);
  expect(renderMock).toHaveBeenCalledWith('crudClubes/ver',
    {
      layout: 'index',
      style: 'verEquipo.css',
      equipo: {},
    });
});

test('clubCreateGet renderea agregar', async () => {
  const renderMock = jest.fn();
  await controller.clubCreateGet({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenLastCalledWith('crudClubes/agregar', {
    layout: 'index',
    style: 'agregar.css',
  });
});

test('clubCreatePost  crea un club', async () => {
  serviceMock.saveEquipo.mockReset();
  const redirectMock = jest.fn();
  const fakeCrestUrl = '/ejemplo/logo.png';
  const bodymock = new Equipo({
    id: undefined,
    area: undefined,
    name: undefined,
    crestUrl: '/ejemplo/logo.png',
    address: undefined,
    lastUpdate: undefined,
  });
  controller.clubCreatePost(
    { body: bodymock, file: { path: fakeCrestUrl }, session: { errors: [], messages: [] } },
    { redirect: redirectMock },
  );
  await serviceMock.saveEquipo(bodymock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/crudClubes');
  expect(serviceMock.saveEquipo).toHaveBeenCalledTimes(1);
  expect(serviceMock.saveEquipo).toHaveBeenCalledWith(bodymock);
});

test('clubUpdateGet renderea editar y utiliza un id para pasarlo como parametro', async () => {
  const renderMock = jest.fn();
  const id = 1;
  await controller.clubUpdateGet({ params: { id } }, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('crudClubes/editar', {
    layout: 'index',
    style: 'editar.css',
    id,
  });
});

test('clubUpdatePut intenta actualizar un equipo con id undefined', () => {
  expect(controller.clubUpdatePut({ params: {} })).rejects.toThrowError(ClubIdNotDefinedError);
});
test('clubUpdatePut actualiza un equipo con id especifico y redirecciona a /crudClubes', async () => {
  serviceMock.updateEquipo.mockReset();
  const redirectMock = jest.fn();
  const fakeCrestUrl = '/ejemplo/logo.png';
  const bodymock = new Equipo({
    id: undefined,
    area: undefined,
    name: undefined,
    crestUrl: '/ejemplo/logo.png',
    address: undefined,
    lastUpdate: undefined,
  });
  controller.clubUpdatePut(
    {
      body: bodymock, params: { id: 1 }, file: { path: fakeCrestUrl }, session: { errors: [], messages: [] },
    },
    { redirect: redirectMock },
  );
  await serviceMock.updateEquipo(bodymock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/crudClubes');
  expect(serviceMock.updateEquipo).toHaveBeenCalledTimes(1);
  expect(serviceMock.updateEquipo).toHaveBeenCalledWith(bodymock);
});

test('clubDelete intenta borrar un equipo con un id undefined', () => {
  const redirectMock = jest.fn();
  expect(controller.clubDelete({ params: {}, session: { errors: [], messages: [] } }, { redirect: redirectMock })).rejects.toThrowError(ClubIdNotDefinedError);
});

test('clubDelete elimina un equipo con un id especifico y redirecciona a /crudClubes', async () => {
  const redirectMock = jest.fn();
  const id = 1;

  await controller.clubDelete({ params: { id }, session: { messages: [], errors: [] } }, { redirect: redirectMock });

  expect(serviceMock.deleteEquipo).toBeCalledTimes(1);
  expect(serviceMock.deleteEquipo).toBeCalledWith(id);
  expect(redirectMock).toBeCalledTimes(1);
  expect(redirectMock).toBeCalledWith('/crudClubes');
});
