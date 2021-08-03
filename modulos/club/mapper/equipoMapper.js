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
function fromDbToEntity({
  id,
  'area_name': areaName,
  name,
  'short_name': shortName,
  'crest_url': crestUrl,
  address,
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
module.exports = {
  fromDbToEntity,
  fromDataToEntity,
};
