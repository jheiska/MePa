const laivatRouter = require("express").Router()
const { Laiva } = require("../models/db")

laivatRouter.get("/", async (request, response) => {
  const laivat = await Laiva.findAll()
  response.json(laivat.map(laiva => formatLaiva(laiva)))
})

laivatRouter.get("/:id", async (request, response) => {
  const laiva = await Laiva.findById(request.params.id)
  response.json(kaynti)
})

laivatRouter.delete("/:id", async (request, response) => {
  const laiva = await Laiva.findById(request.params.id)
  laiva.destroy()
  response.json("Laiva poistettu")
})

laivatRouter.post("/", async (request, response) => {
  const body = request.body
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" })
  }

  const laiva = buildLaiva(body)

  await laiva
    .save()
    .then(uusiLaiva => {
      return response.status(200).json(formatLaiva(uusiLaiva))
    })

    .catch(error => {
      response.status(500).json({ error: "something went wrong..." })
    })
})

const buildLaiva = laiva =>
  Laiva.build({
    nimi: laiva.nimi,
    lippu: laiva.lippu,
    kansalaisuudet: laiva.kansalaisuudet.map(l => l)
  })

const formatLaiva = laiva => {
  return {
    nimi: laiva.nimi,
    lippu: laiva.lippu,
    kansalaisuudet: laiva.kansalaisuudet
  }
}

module.exports = laivatRouter
