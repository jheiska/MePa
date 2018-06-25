const laivaRouter = require('express').Router()
const Laiva = require('../models/laiva')

 const formatLaiva = (laiva) => {
      return {
          id: laiva.id,
          nimi: laiva.nimi,
          lippu: laiva.lippu,
          kansalaisuudet: laiva.kansalaisuudet
      }
  }

  laivaRouter.get('/', (request, response) => {
    Laiva
    .findAll()
    .then(laivat => {
      response.json(laivat.map(fromatLaiva))
    })  
  })

  laivaRouter.post('/laivat', (request, response) => {
    const laiva = request.body
    Laiva
      .create({
          "nimi": laiva.nimi,
          "lippu": laiva.lippu,
          "kansalaisuudet": laiva.kansalaisuudet
      })
      .then(response.json('Laiva lisätty!'))
    })
  
  

module.exports = laivaRouter