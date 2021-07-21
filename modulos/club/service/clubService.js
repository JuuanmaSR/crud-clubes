/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
module.exports = function (serviceLocator) {
  const clubRepository = serviceLocator.get('clubRepository');
  return {
    saveEquipo: (equipo) => {
      try {
        clubRepository.save(equipo);
      } catch (error) {
        console.log(`no se pudo guardar el equipo: ${equipo}`);
      }
    },
    updateEquipo: (equipo) => {
      try {
        clubRepository.update(equipo);
      } catch (error) {
        console.log(`no se pudo actualizar el equipo${equipo}`);
      }
    },
    deleteEquipo: (equipoid) => {
      clubRepository.deletes(equipoid);
    },
    getAll: () => clubRepository.getAll(),
    getById: (equipoid) => clubRepository.getById(equipoid),

  };
};
