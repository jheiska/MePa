const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const { User } = require("../models/db")

usersRouter.get("/", async (request, response) => {
  const users = await User.findAll()
  response.json(users.map(user => formatUser(user)))
})

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id)
  response.json(formatUser(user))
})

const formatUser = user => {
  return {
    username: user.username,
    nimi: user.nimi,
    oletussatama: user.oletussatama
  }
}

usersRouter.post("/", async (request, response) => {
  try {
    const body = request.body

    if (body === undefined) {
      return response.status(400).json({ error: "content missing" })
    }

    /*
    const existingUser = await findOne({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: "username must be unique" })
    }
*/

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    await User.create({
      username: body.username,
      nimi: body.nimi,
      oletussatama: body.oletussatama,
      passwordHash
    })
    response.json(body)
  } catch (error) {
    response.status(500).json({ error: "something went wrong..." })
  }
})

usersRouter.delete("/:id", async (request, response) => {
  const user = await User.findById(request.params.id)
  user.destroy()
  response.json("Käyttäjä poistettu")
})

module.exports = usersRouter
