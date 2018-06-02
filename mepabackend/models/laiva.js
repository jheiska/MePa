'use strict'
module.exports = (sequelize, DataTypes) => {
    var laiva = sequelize.define('miniKaynti', {
        nimi: {
            type: Sequelize.TEXT
        },
        lippu: {
            type: Sequelize.TEXT
        },
        kansalaisuudet: {
            type: Sequelize.TEXT
        }
      });
  
  
  
    return laiva;
  };