class Equipo {
  constructor(id, pais, nombre, logo, ubicacion, fechaModificacion) {
    this.id = id;
    this.area = pais;
    this.name = nombre;
    this.crestUrl = logo;
    this.address = ubicacion;
    this.lastUpdated = fechaModificacion;
  }
}
module.exports = Equipo;
