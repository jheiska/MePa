const kayntiRouter = require("express").Router();
const { Kaynti } = require("../models/db");

kayntiRouter.get("/", async (request, response) => {
  const kaynnit = await Kaynti.findAll();
  response.json(kaynnit);
});

kayntiRouter.get("/:id", async (request, response) => {
  const kaynnit = await Kaynti.findById(request.params.id);
  response.json(kaynnit);
});

//   .findOne({ where: {id: request.params.id }})
// .destroy({ where: { id: request.params.id }})

kayntiRouter.delete("/:id", async (request, response) => {
  const kaynti = await Kaynti.findById(request.params.id);
  kaynti.destroy();
});

kayntiRouter.post("/", async (request, response) => {
  const body = request.body;
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const kaynti = buildKaynti(body);

  await kaynti
    .save()
    .then(anotherTask => {
      return response.status(200).json(anotherTask);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ error: "something went wrong..." });
    });
});

const buildKaynti = body =>
  Kaynti.build({
    kavija: body.kavija,
    satama: body.satama,
    laiva: body.laiva,
    palvelut: [body.palvelut],
    toimitukset: [body.toimitukset],
    kesto: body.kesto,
    henkiloiden_maara: body.henkiloiden_maara,
    keskustelujen_maara: body.keskustelujen_maara,
    kuljetettujen_maara: body.kuljetettujen_maara,
    merenkulkijoiden_viesti: body.merenkulkijoiden_viesti,
    mepan_viesti: body.mepan_viesti
  });

module.exports = kayntiRouter;
