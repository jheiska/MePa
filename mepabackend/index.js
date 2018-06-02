const express = require('express')
const app = express()
const cors = require('cors')
//const miniRouter = require('./controllers/miniKaynnit')
const Sequelize = require('sequelize')
// const miniModel = require('./models/miniKaynti')
const sequelize = new Sequelize('postgres://jaakk:jaakko@localhost:5432/mepaTest')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  const MiniKaynti = sequelize.define('minikaynti',
  {
    kavija: {
      type: Sequelize.TEXT
    },
    satama: {
      type: Sequelize.TEXT
    },
    laiva: {
        type: Sequelize.TEXT
    }
  })


const formatMiniKaynti = (minikaynti) => {
    return {
      id: minikaynti.id,
      kavija: minikaynti.kavija,
      satama: minikaynti.satama,
      laiva: minikaynti.laiva  
    }
}

app.get('/mini', (request, response) => {
    MiniKaynti
      .findAll()
      .then(miniKaynnit => {
          response.json(miniKaynnit.map(formatMiniKaynti))
      })
})

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

  const formatLaiva = (laiva) => {
      return {
          id: laiva.id,
          nimi: laiva.nimi,
          lippu: laiva.lippu,
          kansalaisuudet: laiva.kansalaisuudet
      }
  }

  app.get('/laivat', (request, response) => {
    Laiva
      .findAll()
      .then(laivat => {
          response.json(laivat.map(formatLaiva))
      })
  })

  app.get('/createLaiva', (request, response) => {
    Laiva.create({
            nimi: 'Laiva2',
            lippu: 'rosvo',
            kansalaisuudet: 'maailman'
        })
        .then(response.json('Laiva lisätty!'))
    })



  /*
TESTIFINDEJA:

  MiniKaynti.findAll().then(kaynnit => {console.log(kaynnit)})

  Kaynti.findOne({ where: { kavija: 'kavija1' }}).then(kaynnit => {console.log(kaynnit)})
*/

app.use(cors())
//app.use('/api/minikaynnit', miniRouter())

/*
let laivat = [
    {id: 1,
    nimi: 'Laiva1',
    lippu: 'Suomi'},
    {id: 2,
    nimi: 'Laiva2',
    lippu:'Ruotsi'},
    {id: 3,
    nimi: 'Laiva3',
    lippu:'Viro'}
]
*/
app.get('/', (req, res) => {
    res.send('<h1>MePa-sovellus!</h1>')
})
 /* 
app.get('/laivat', (req, res) => {
    res.json(laivat)
})
*/
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})