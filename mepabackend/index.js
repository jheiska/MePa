const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

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

app.get('/', (req, res) => {
    res.send('<h1>MePa-sovellus!</h1>')
})
  
app.get('/laivat', (req, res) => {
    res.json(laivat)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})