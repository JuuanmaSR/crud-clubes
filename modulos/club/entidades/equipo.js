class Equipo {
  constructor({
    id, areaName, name, shortName, crestUrl, address,
  }) {
    this.id = id;
    this.areaName = areaName;
    this.name = name;
    this.shortName = shortName;
    this.crestUrl = crestUrl;
    this.address = address;
  }
}
module.exports = Equipo;
