const Sequelize = require("sequelize")
const sequelize = new Sequelize(
  "postgres://jaakk:jaakko@localhost:5432/mepaTest"
)
const Kaynti = sequelize.import("./kaynti")
const Laiva = sequelize.import("./laiva")
const User = sequelize.import("./user")
const Satama = sequelize.import("./satama")

const connectDB = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.")
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err)
    })
  sequelize.sync()
}

module.exports = { sequelize, connectDB, Laiva, Kaynti, Satama, User }
