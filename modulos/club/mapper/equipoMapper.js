/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const Equipo = require('../entidades/equipo');

function fromDataToEntity({
  id, area_name: areaName, name, short_name: shortName, crest_url: crestUrl, address, lastUpdated,
}) {
  return new Equipo(
    id,
    areaName,
    name,
    shortName,
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
