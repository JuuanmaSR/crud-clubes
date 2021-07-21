/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
module.exports = function () {
  const dependencies = {}; // funciones u objetos que no tiene otras dependencias
  const factories = {}; // modulos que tienen dependencias internas y van a utilizar Service Locator
  const serviceLocator = {
    factory,
    register,
    get,
  };
  // Factory cuando se sabe que el modulo contendra otras dependencias
  // hara uso interno de Service Locator
  function factory(name, factory) {
    factories[name] = factory;
  }
  // Registra se encarga de registrar un modulo como dependencia
  // Se hace register cuando se sabe que un modulo no va a tener dependencias
  function register(name, dependency) {
    dependencies[name] = dependency;
  }
  // Get devuelve modulo registrado como dependencia
  // Si no se encuentra registrado lo buscamos en factoria para que internamente pueda ser usado
  // Si no existiese lanzariamos una excepción ya que el modulo buscado no ha sido registrado
  function get(name) {
    if (!dependencies[name]) {
      const factory = factories[name];
      dependencies[name] = factory && factory(serviceLocator);
      if (!dependencies[name]) {
        throw new Error('No existe este modulo en el ServiceLocator');
      }
    }
    return dependencies[name];
  }
  return serviceLocator;
};
