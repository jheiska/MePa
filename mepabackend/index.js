require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const satamat = require('./resources/satamat')
//const loginRouter = require('./controllers/login')
const db = require('./models/db')
//const laivatRouter = require('./controllers/laivat' )
kaynnitRouter = require('./controllers/kaynnit')

app.use(bodyParser.json());
app.use(cors())
//app.use('/api/laivat', laivatRouter)
app.use('/api/kaynnit', kaynnitRouter)
//app.use('/api/login', loginRouter)

app.get('/satamat', (request, response) => {
  const satamat = this.satamat
  .then(satamat => {
    response.json(satamat.map(formatSatama)) 
  })
})

const formatSatama = (satama) => {
  return {
    id: satama.id,
    nimi: satama.nimi
  }
} 

 
app.get('/', (req, res) => {
    res.send('MePa-sovellus!')
})

db.connectDB()


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*
const formatKaynti = (kaynti) => {
  return {
    kavija: kaynti.kavija,
    satama: [kaynti.satama],
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
*/