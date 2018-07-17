const satamatRouter = require("express").Router()
const { Satama } = require("../models/db")

satamatRouter.get("/", async (request, response) => {
  const satamat = await Satama.findAll()
  response.json(satamat.map(s => formatSatama(s)))
})

satamatRouter.get("/:id", async (request, response) => {
  const satama = await Satama.findById(request.params.id)
  response.json(formatSatama(satama))
})

satamatRouter.delete("/:id", async (request, response) => {
  const satama = await Satama.findById(request.params.id)
  satama.destroy()
  response.json("Satama poistettu")
})

satamatRouter.post("/", async (request, response) => {
  const body = request.body
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" })
  }

  const satama = buildSatama(body)

  await satama
    .save()
    .then(uusiSatama => {
      return response.status(200).json(formatSatama(uusiSatama))
    })

    .catch(error => {
      response.status(500).json({ error: "something went wrong..." })
    })
})

const buildSatama = satama =>
  Satama.build({
    kaupunki: satama.kaupunki,
    koodi: satama.koodi
  })

const formatSatama = satama => {
  return {
    kaupunki: satama.kaupunki,
    koodi: satama.koodi
  }
}

module.exports = satamatRouter
