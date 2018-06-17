const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


//const laivatRouter = require('./controllers/laivat' )
//const kaynnitRouter = require('./controllers/kaynnit')(sequelize)

const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://jaakk:jaakko@localhost:5432/mepaTest')


//const miniRouter = require('./controllers/miniKaynnit')


app.use(bodyParser.json());
app.use(cors())
//app.use('/api/laivat', laivatRouter)
//app.use('/api/kaynnit', kaynnitRouter)


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Laiva = sequelize.define('laiva', {
    nimi: {
        type: Sequelize.TEXT
    },
    lippu: {
        type: Sequelize.TEXT
    },
    kansalaisuudet: {
        type: Sequelize.TEXT
    }
  })

app.get('/laivat', (request, response) => {
    Laiva
      .findAll()
      .then(laivat => {
          response.json(laivat.map(formatLaiva))
      })
    })

  app.post('/laivat', (request, response) => {
    const laiva = request.body
    Laiva
      .create({
          "nimi": laiva.nimi,
          "lippu": laiva.lippu,
          "kansalaisuudet": laiva.kansalaisuudet
      })
      .then(response.json('Laiva lisätty!'))
    })



  /*
TESTIFINDEJA:
*/




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

app.get('/kaynnit', (request, response) => {
  Kaynti
  .findAll()
  .then(kaynnit => {
    response.json(kaynnit.map(fromatKaynti))
  })  
})

app.get('/kaynnit/:id', (request, response) => {
  Kaynti
  .findOne({ where: {id: request.params.id }})
  .then(kaynti => response.json(fromatKaynti(kaynti)))
})

app.delete('/kaynnit/:id', (request, response) => {
  Kaynti
  .destroy({ where: { id: request.params.id }})
  .then(response.json("Succesfully deleted"))
})

app.post('/kaynnit', (request, response) => {
  const body = request.body
  console.log(body)

  /*
  if (body.content === undefined) {
    response.status(400).json({error: 'content missing'})
  }
*/
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
 

app.get('/', (req, res) => {
    res.send('<h1>MePa-sovellus!</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})