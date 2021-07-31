/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const Equipo = require('../entidades/equipo');
const Area = require('../entidades/area');

function fromDataToEntity(
  id, area_name, name, crestUrl, address, lastUpdated,
) {
  return new Equipo(
    id,
    new Area(area_name),
    name,
    crestUrl,
    address,
    lastUpdated,
  );
}
function fromDbToEntity({
  id,
  area_name,
  name,
  short_name,
  crest_url,
  address,
}) {
  return new Equipo({
    id,
    area_name,
    name,
    short_name,
    crest_url,
    address,
  });
}
module.exports = {
  fromDbToEntity,
  fromDataToEntity,
};
