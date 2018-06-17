"using strict"

module.exports = (sequelize, DataTypes) => {
    sequelize = props.sequelize
  
      const Laiva = sequelize.define('laiva', {
        nimi: {
            type: Sequelize.TEXT
        },
        lippu: {
            type: Sequelize.TEXT
        },
        kansalaisuudet: {
            type: Sequelize.TEXT
        }
      })
  
    return Laiva;
  };