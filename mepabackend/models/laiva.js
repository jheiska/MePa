const Laiva = (sequelize, DataTypes) => {
  return sequelize.define("laiva", {
    nimi: DataTypes.TEXT,
    lippu: DataTypes.TEXT,
    kansalaisuudet: DataTypes.ARRAY(DataTypes.TEXT)
  })
}

module.exports = Laiva
