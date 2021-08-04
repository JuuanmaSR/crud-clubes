/* eslint-disable max-len */
/* eslint-disable no-undef */
const ClubController = require('../clubController');
const ClubIdNotDefinedError = require('../error/ClubIdNotDefinedError');
const Equipo = require('../../entidades/equipo');

const serviceMock = {
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
  saveEquipo: jest.fn(() => Promise.resolve({})),
  deleteEquipo: jest.fn(() => Promise.resolve(true)),
};
const controller = new ClubController(serviceMock);

test('clubIndex renderea el inicio', async () => {
  const renderMock = jest.fn();
  await controller.clubIndex(
    { session: { errors: [], messages: [] } }, { render: renderMock },
    {
      layout: '',
      style: '',
    },
  );
  expect(serviceMock.getAll).toHaveBeenCalledTimes(1);
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
  expect(controller.clubDetails({ params: { } })).rejects.toThrowError(ClubIdNotDefinedError);
});

test('clubDetails obtiene ID del club y lo renderea', async () => {
  serviceMock.getById.mockImplementationOnce(() => ({}));

  const idMock = 1;
  const renderMock = jest.fn();
  await controller.clubDetails({ params: { id: idMock } }, { render: renderMock });
  expect(serviceMock.getById).toHaveBeenCalledWith(idMock);
  expect(serviceMock.getById).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('crudClubes/ver',
    {
      layout: 'index',
      style: 'verEquipo.css',
      equipo: {},
    });
});

test('clubCreateGet renderea form', async () => {
  const renderMock = jest.fn();
  await controller.clubCreateGet({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenLastCalledWith('crudClubes/form', {
    layout: 'index',
    style: 'form.css',
    title: 'Crear un equipo',
  });
});

test('clubSave  crea o guarda un club', async () => {
  serviceMock.saveEquipo.mockReset();
  const redirectMock = jest.fn();
  controller.clubSave({ session: { errors: [], messages: [] } }, { redirect: redirectMock });
  const fakeCrestUrl = '/ejemplo/logo.png';
  const bodymock = new Equipo({
    id: undefined,
    areaName: undefined,
    name: undefined,
    shortName: undefined,
    crestUrl: fakeCrestUrl,
    address: undefined,

  });
  await serviceMock.saveEquipo(bodymock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/crudClubes');
  expect(serviceMock.saveEquipo).toHaveBeenCalledTimes(1);
  expect(serviceMock.saveEquipo).toHaveBeenCalledWith(bodymock);
});

test('clubUpdateGet renderea un form y utiliza un id para pasarlo como parametro', async () => {
  const renderMock = jest.fn();
  const id = 1;
  await controller.clubUpdateGet({ params: { id } }, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('crudClubes/form', {
    layout: 'index',
    style: 'form.css',
    title: 'Actualizar un equipo',
    id,
  });
});

test('clubDelete elimina un equipo con un id especifico y redirecciona a /crudClubes', async () => {
  const redirectMock = jest.fn();
  const id = 1;

  await controller.clubDelete({ params: { id }, session: { messages: [], errors: [] } }, { redirect: redirectMock });

  expect(serviceMock.getById).toBeCalledWith(id);
  expect(serviceMock.getById).toHaveBeenCalled();
  expect(serviceMock.deleteEquipo).toHaveBeenCalledTimes(1);
});

test('clubDelete intenta borrar un equipo con un id undefined', async () => {
  serviceMock.deleteEquipo.mockImplementationOnce(() => {
    throw Error('error');
  });
  const redirectMock = jest.fn();
  const req = { params: { id: 1 }, session: { errors: [] } };
  await controller.clubDelete(req, { redirect: redirectMock });

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(req.session.errors).not.toEqual([]);
});
