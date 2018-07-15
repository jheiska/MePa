const Kaynti = (sequelize, DataTypes) => {
  return sequelize.define("kaynti", {
    kavijat: DataTypes.ARRAY(DataTypes.TEXT),
    satama: DataTypes.TEXT,
    laiva: DataTypes.TEXT,
    palvelut: DataTypes.ARRAY(DataTypes.TEXT),
    toimitukset: DataTypes.ARRAY(DataTypes.TEXT),
    kesto: DataTypes.INTEGER,
    henkiloiden_maara: DataTypes.INTEGER,
    keskustelujen_maara: DataTypes.INTEGER,
    kuljetettujen_maara: DataTypes.INTEGER,
    merenkulkijoiden_viesti: DataTypes.TEXT,
    mepan_viesti: DataTypes.TEXT
  })
}

module.exports = Kaynti
