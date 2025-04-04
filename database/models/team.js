'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      this.belongsTo(models.League, {
        foreignKey: 'leagueId',
        allowNull: false,
        as: 'league'
      })

      this.hasOne(models.Roster, {
        foreignKey: 'teamId',
        allowNull: false,
        as: 'roster'
      })
    }
  }
  Team.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};