const User = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nimi: DataTypes.STRING,
    oletussatama: DataTypes.STRING
  });
};

module.exports = User;
