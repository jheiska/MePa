import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kavijat: [
        'Niklas',
        'Heli',
        'Johan',
        'Jukka',
        'Krista',
        'Martina',
        'Paula',
        'Pekka',
        'Päivi',
        'Sampsa',
        'Tuomas'
      ],
      valittuKavija: null,
      satamat: [
        '1. Helsinki, FIHEL, Etelä',
        '2. Helsinki, FIHEL, Hernesaari ja Länsi',
        '3. Helsinki, FIHEL, Vuosaari',
        '4. Eurajoki, FIEJO',
        '5. Hanko, FIHKO',
        '6. Hamina, FIKTK',
        '7. Inkoo, FIINK',
        '8. Kalajoki, FIKJO',
        '9. Kantvik, FIKNT',
        '10. Kaskinen FIKAS',
        '11. Kemi, FIKEM',
        '12, Kilpilahti, FISKV',
        '13. Kristiinankaupunki, FIKRS',
        '14. Kokkola, FIKOK',
        '15. Kotka, FIKTK',
        '16. Koverhar, FIKVH',
        '17. Lentokenttä, Helsinki-Vantaa',
        '18. Loviisa, FILOV',
        '19. Mariehamn, FIMHQ',
        '20. Naantali, FINLI',
        '21. Oulu, FIOUL',
        '22. Parainen, FIPAR',
        '23. Pori, FIPOR',
        '24. Posti',
        '25. Raahe, FIRAA',
        '26. Rauma, FIRAU',
        '27. Turku, FITKU',
        '28. Turku, korjaustelakka',
        '29. Tolkkinen, FITOK',
        '30. Tornio, FITOR',
        '31. Uusikaupunki, FIUKI',
        '32. Vaasa, FIVAA',
        '33. Muu Ahvenanmaa',
        '34. Muu Saimaa',
        '35. Muu Satama',
        '36. Muu ulkomainen satama'        
      ],
      valittuSatama: null,
      palvelut: [
        'Laivakäynti',
        'Spotti',
        'Kuljetus',
        'Asiointipalvelut'
      ],
      valittuPalvelu: null,
      toimitukset: [
        {nimi: 'Lehdet', toimitettu: false},
        {nimi: 'Vapaavahti tai muu MEPA-materiaali', toimitettu:false},
        {nimi: 'Videot', toimitettu: false},
        {nimi: 'Kirjat tilatut', toimitettu: false},
        {nimi: 'Kirjastovaihto', toimitettu: false},
        {nimi: 'Info tai muu tiedottaminen', toimitettu: false},
        {nimi: 'Vierailu/tutustuminen', toimitettu: false},
        {nimi: 'Treeni tai työhyvinvointipalvelu', toimitettu: false},
      ],
      valitutToimitukset: []
    }
  }
  
  vaihdaKavija = (e) => {
    this.setState({
      valittuKavija: e.target.value
    });
  }

  vaihdaSatama = (e) => {
    this.setState({
      valittuSatama: e.target.value
    })
  }

  vaihdaPalvelu = (e) => {
    this.setState({
      valittuPalvelu: e.target.value
    })
  }

  vaihdaToimitukset = (e) => {
    const vanhatToimitukset = this.state.toimitukset
    console.log(vanhatToimitukset)
    const checkBox = document.getElementById("toimitusBox")
    console.log(checkBox)
    const tsekattu = checkBox.checked
    console.log(tsekattu)
    const uudetToimitukset = vanhatToimitukset.map ((t) => {
      if(t.nimi === e.target.value) {
        t.nimi = t.nimi
        t.toimitettu = tsekattu
        console.log(t.nimi)
        console.log(t.toimitettu)
      } else {
        t.nimi = t.nimi
        t.toimitettu = t.toimitettu
      }
    })
    this.setState({
      valitutToimitukset: uudetToimitukset
    })
  }
  
  render() {
    const kavijat = () => this.state.kavijat.map ((k, index) => 
    <div key={index}>
      <input type="radio"
        name="kavija" value={k}
        onChange={this.vaihdaKavija}/>
      {k}
    </div>
    )

    const satamat = () => this.state.satamat.map (m =>
      <button key={m} 
      className = "dropdown-button" 
      onClick={this.vaihdaSatama} 
      value={m} >
      {m}
      </button>
    )

    const avaaSatamat = () => {
      document.getElementById("sataman_valinta").classList.toggle("show")
    }

    const palvelut = () => this.state.palvelut.map ((p, index) => 
    <div key={index}>
      <input type="radio"
        name="palvelu" value={p}
        onChange={this.vaihdaPalvelu}/>
      {p}
    </div>
    )

    const toimitukset = () => this.state.toimitukset.map ((t, index) => 
    <div key={index}>
      <p>{t.nimi}:  <input type="checkbox" value={t.nimi} id="toimitusBox" onChange={this.vaihdaToimitukset} /> </p>
    </div>
    )

    const avaaToimitukset = () => {
      document.getElementById("toimitusten_valinta").classList.toggle("show")
    }

    return (
      <div>
        <form>
          <h1>Kävijä:</h1>
          <div>
            {kavijat()}
          </div>
        </form>
        <div className="dropdown">
          <button onClick={() => avaaSatamat()} className="dropbtn">Valitse satama</button>
          <div id="sataman_valinta" className="dropdown-content">
            {satamat()}
          </div>
        <form>
          <h1>Palvelu:</h1>
          <div>
            {palvelut()}
          </div>
        </form>
        <div className="dropdown">
          <button onClick={() => avaaToimitukset()} className="dropbtn">Valitse toimitukset</button>
          <div id="toimitusten_valinta" className="dropdown-content">
            {toimitukset()}
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default App;
