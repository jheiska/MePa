const kansalaisuudetRouter = require("express").Router()
const { Kansalaisuus } = require("../models/db")

kansalaisuudetRouter.get("/", async (request, response) => {
  const kansalaisuudet = await Kansalaisuus.findAll()
  response.json(kansalaisuudet.map(s => formatkansalaisuus(s)))
})

kansalaisuudetRouter.get("/:id", async (request, response) => {
  const kansalaisuus = await Kansalaisuus.findById(request.params.id)
  response.json(formatkansalaisuus(kansalaisuus))
})

kansalaisuudetRouter.delete("/:id", async (request, response) => {
  const kansalaisuus = await Kansalaisuus.findById(request.params.id)
  kansalaisuus.destroy()
  response.json("kansalaisuus poistettu")
})

kansalaisuudetRouter.post("/", async (request, response) => {
  const body = request.body
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" })
  }
  const kansalaisuus = buildKansalaisuus(body)
  try {
    const uusiKansalaisuus = await kansalaisuus.save()
    response.status(200).json(JSON.parse(uusiKansalaisuus))
  } catch (error) {
    response.status(500).json({ error: "something went wrong..." })
  }
})

const buildKansalaisuus = kansalaisuus =>
  Kansalaisuus.build({
    valtio: kansalaisuus.valtio
  })

const formatkansalaisuus = kansalaisuus => {
  return {
    valtio: kansalaisuus.valtio
  }
}

module.exports = kansalaisuudetRouter
