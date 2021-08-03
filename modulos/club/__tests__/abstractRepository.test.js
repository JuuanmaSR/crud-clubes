/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */
const AbstractRepository = require('../../abstractRepository');
const AbstractErrorRepository = require('../../error/abstractErrorRepository');
const MethodNotImplementedError = require('../repository/error/MethodNotImplementedError');

test('No se puede instanciar un respositorio abstracto', () => {
  let repositoryInstance;
  try {
    repositoryInstance = new AbstractRepository();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractErrorRepository);
  } finally {
    expect(repositoryInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractRepository {};
  const repositoryInstance = new ConcreteRepository();
  expect(repositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(repositoryInstance).toBeInstanceOf(AbstractRepository);
});

test('Llamar a los metodos base sin implementacion concreta da error', () => {
  const ConcreteRepository = class extends AbstractRepository {};
  const repositoryInstance = new ConcreteRepository();

  expect(() => repositoryInstance.save()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => repositoryInstance.delete()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => repositoryInstance.getById()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => repositoryInstance.getAll()).rejects.toThrowError(MethodNotImplementedError);
});
