const User = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: DataTypes.STRING,
    nimi: DataTypes.STRING,
    oletussatama: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  })
}

module.exports = User
