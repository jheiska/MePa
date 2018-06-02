'use strict';
module.exports = (sequelize, DataTypes) => {
  var miniKaynti = sequelize.define('miniKaynti', {
    kavija: {
      type: Sequelize.TEXT
    },
    satama: {
      type: Sequelize.TEXT
    },
    laiva: {
        type: Sequelize.TEXT
    }
  });

  return miniKaynti;
};