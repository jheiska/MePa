const laivatRouter = require("express").Router()
const { Laiva, Kansalaisuus } = require("../models/db")

laivatRouter.get("/", async (request, response) => {
  // const laivat = await Laiva.findAll({ include: [{ model: Kansalaisuus }] })
  const laivat = await Laiva.findAll()
  response.json(laivat.map(laiva => formatLaiva(laiva)))
  //  response.json(laivat.map(laiva => formatLaiva(laiva)))
})

laivatRouter.get("/:id", async (request, response) => {
  const laiva = await Laiva.findById(request.params.id)
  response.json(formatLaiva(laiva))
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
    kansalaisuudet: laiva.kansalaisuudet
  })

laivatRouter.put("/:id", async (request, response) => {
  const laiva = await Laiva.findById(request.params.id)
  const kansalaisuusId = request.body.kansalaisuus
  const kansalaisuus = await Kansalaisuus.findById(kansalaisuusId)

  await laiva.addKansalaisuus(kansalaisuus)
  response.json("Kansalaisuus lisätty laivaan")
  /*
  const updatedLaiva = await Laiva.update(
    { kansalaisuudet: request.body.kansalaisuudet },
    { returning: true, where: { id: request.params.laivaId } }
  )
  
  response.json(formatLaiva(updatedLaiva))
  */
})

const formatLaiva = laiva => {
  return {
    id: laiva.id,
    nimi: laiva.nimi,
    lippu: laiva.lippu,
    kansalaisuudet: ""
    //    kansalaisuudet: laiva.kansalaisuus
  }
}

module.exports = laivatRouter
