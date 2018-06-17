
module.exports = (sequelize, DataTypes) => {
    sequelize = props.sequelize
    var Kaynti = sequelize.define('kaynti', {
    kavija: {
      type: Sequelize.TEXT
    },
    satama: {
      type: Sequelize.TEXT
    },
    laiva: {
        type: Sequelize.TEXT
    },
    palvelut: {
        type: Sequelize.TEXT
    },
    toimitukset: {
        type: Sequelize.TEXT
    },
    kesto: {
        type: Sequelize.INTEGER
    },
    henkiloiden_maara: {
        type: Sequelize.INTEGER
    },
    keskustelujen_maara: {
        type: Sequelize.INTEGER
    },
    kuljetettujen_maara: {
        type: Sequelize.INTEGER
    },
    merenkulkijoiden_viesti: {
        type: Sequelize.TEXT
    },
    mepan_viesti: {
        type: Sequelize.TEXT
    }
    
    })
    return Kaynti   
    } 
