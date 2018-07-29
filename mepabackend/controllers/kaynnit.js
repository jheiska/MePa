const kayntiRouter = require("express").Router()
const { Kaynti, Laiva } = require("../models/db")

kayntiRouter.get("/", async (request, response) => {
  const kaynnit = await Kaynti.findAll({ include: [{ model: Laiva }] })
  response.json(kaynnit.map(kaynti => formatKaynti(kaynti)))
})

kayntiRouter.get("/:id", async (request, response) => {
  const kaynti = await Kaynti.findById(request.params.id)
  response.json(formatKaynti(kaynti))
})

// Tämmösiä vois tehä eri parametreilla jos on tarvetta:
//    .findOne({ where: {id: request.params.id }})
//    .destroy({ where: { id: request.params.id }})

kayntiRouter.delete("/:id", async (request, response) => {
  try {
    const kaynti = await Kaynti.findById(request.params.id)

    await kaynti.destroy()
    response.status(200).json("Käynti poistettu")
  } catch (error) {
    return response.status(500).json({ error: "Poisto epäonnistuii" })
  }
})

kayntiRouter.post("/", async (request, response) => {
  const body = request.body
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" })
  }
  const kaynti = buildKaynti(body)
  try {
    const uusiKaynti = await kaynti.save()
    response.status(200).json(JSON.parse(uusiKaynti))
  } catch (error) {
    response.status(500).json({ error: "something went wrong..." })
  }
})

const buildKaynti = kaynti =>
  Kaynti.build({
    pvm: kaynti.pvm,
    kayttaja: kaynti.kayttaja,
    kavijat: kaynti.kavijat,
    satama: kaynti.satama,
    laivaId: kaynti.laivaId,
    palvelut: kaynti.palvelut,
    toimitukset: kaynti.toimitukset,
    kesto: kaynti.kesto,
    henkiloiden_maara: kaynti.henkiloiden_maara,
    keskustelujen_maara: kaynti.keskustelujen_maara,
    kuljetettujen_maara: kaynti.kuljetettujen_maara,
    merenkulkijoiden_viesti: kaynti.merenkulkijoiden_viesti,
    mepan_viesti: kaynti.mepan_viesti
  })

const formatKaynti = kaynti => {
  return {
    pvm: kaynti.pvm,
    kayttaja: kaynti.kayttaja,
    kavijat: kaynti.kavijat,
    satama: kaynti.satama,
    laiva: [kaynti.laiva.nimi, kaynti.laiva.lippu, kaynti.laiva.kansallisuudet],
    palvelut: kaynti.palvelut,
    toimitukset: kaynti.palvelut,
    kesto: kaynti.kesto,
    henkiloiden_maara: kaynti.henkiloiden_maara,
    keskustelujen_maara: kaynti.keskustelujen_maara,
    kuljetettujen_maara: kaynti.kuljetettujen_maara,
    merenkulkijoiden_viesti: kaynti.merenkulkijoiden_viesti,
    mepan_viesti: kaynti.mepan_viesti
  }
}

module.exports = kayntiRouter
