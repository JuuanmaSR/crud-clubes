/* eslint-disable no-undef */
const AbstractController = require('../../abstractController');
const AbstractErrorController = require('../../error/abstractErrorController');

test('No se puede instanciar un controller abstracto', () => {
  let controllerInstance;
  try {
    controllerInstance = new AbstractController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractErrorController);
  } finally {
    expect(controllerInstance).toBeUndefined();
  }
});

test('Se puede instanciar un controller concreto que herede del controller abstracto', () => {
  const ConcreteController = class extends AbstractController {};
  const controllerInstance = new ConcreteController();
  expect(controllerInstance).toBeInstanceOf(ConcreteController);
  expect(controllerInstance).toBeInstanceOf(AbstractController);
});
