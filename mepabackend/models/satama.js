const Satama = (sequelize, DataTypes) => {
  return sequelize.define("satama", {
    kaupunki: DataTypes.TEXT,
    koodi: DataTypes.TEXT
  })
}

module.exports = Satama
