/* eslint-disable quote-props */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const Equipo = require('../entidades/equipo');

function fromDataToEntity({
  id, 'area_name': areaName, name, 'short_name': shortName, 'crest_url': crestUrl, address,
}) {
  return new Equipo({
    id,
    areaName,
    name,
    shortName,
    crestUrl,
    address,
  });
}
/**
 *
 * @param {import('../model/equipoModel')} model
 * @returns {import { '../entidades/equipo' }}
 */
function fromModelToEntity(model) {
  return new Equipo(model.toJSON());
}
module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
