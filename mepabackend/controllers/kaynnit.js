const kayntiRouter = require('express').Router()
const sequelize = require('sequelize')
//var Kaynti = require('../models/Kaynti')
"using strict"


const fromatKaynti = (kaynti) => {
  return {
    kavija: kaynti.kavija,
    satama: kaynti.satama,
    laiva: kaynti.laiva,
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

kayntiRouter.get('/', (request, response) => {
  Kaynti
  .findAll()
  .then(kaynnit => {
    response.json(kaynnit.map(fromatKaynti))
  })  
})

kayntiRouter.post('/', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    response.status(400).json({error: 'content missing'})
  }

  Kaynti.create({
    kavija: body.kavija,
    satama: body.satama,
    laiva: body.laiva,
    palvelut: body.palvelut,
    toimitukset: body.toimitukset,
    kesto: body.kesto,
    henkiloiden_maara: body.henkiloiden_maara,
    keskustelujen_maara: body.keskustelujen_maara,
    kuljetettujen_maara: body.kuljetettujen_maara,
    merenkulkijoiden_viesti: body.merenkulkijoiden_viesti,
    mepan_viesti: body.mepan_viesti 
  })
  .then(console.log('lisatty'))
})

var Kaynti = sequelize.define('kaynti', {
  kavija: {
    type: Sequelize.TEXT
  },
  satama: {
    type: Sequelize.TEXT
  },
  laiva: {
      type: Sequelize.TEXT
  },
  palvelut: {
      type: Sequelize.TEXT
  },
  toimitukset: {
      type: Sequelize.TEXT
  },
  kesto: {
      type: Sequelize.INTEGER
  },
  henkiloiden_maara: {
      type: Sequelize.INTEGER
  },
  keskustelujen_maara: {
      type: Sequelize.INTEGER
  },
  kuljetettujen_maara: {
      type: Sequelize.INTEGER
  },
  merenkulkijoiden_viesti: {
      type: Sequelize.TEXT
  },
  mepan_viesti: {
      type: Sequelize.TEXT
  }
  
  })

module.exports = kayntiRouter