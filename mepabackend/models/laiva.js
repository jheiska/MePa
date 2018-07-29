const Laiva = (sequelize, DataTypes) => {
  return sequelize.define("laiva", {
    nimi: { type: DataTypes.STRING },
    lippu: DataTypes.TEXT
  })
}

module.exports = Laiva
