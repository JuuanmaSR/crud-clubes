const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class EquipoModel extends Model {
  /**
     * @param {import('sequelize').Sequelize} sequelizeInstance
     * @returns {typeof EquipoModel}
     */
  static setup(sequelizeInstance) {
    EquipoModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        areaName: {
          type: DataTypes.STRING,
        },
        name: {
          type: DataTypes.STRING,
        },
        shortName: {
          type: DataTypes.STRING,
        },
        crestUrl: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Equipo',
        timestamps: false,
      },
    );

    return EquipoModel;
  }
};
