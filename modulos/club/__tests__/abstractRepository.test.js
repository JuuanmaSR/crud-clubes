/* eslint-disable no-undef */
const AbstractRepository = require('../../abstractRepository');
const AbstractErrorRepository = require('../../error/abstractErrorRepository');

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
