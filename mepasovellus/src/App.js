import React, { Component } from 'react';
import './App.css'
import Checkbox from './components/Checkbox'

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
        'Lehdet',
        'Vapaavahti tai muu MEPA-materiaali',
        'Videot',
        'Kirjat tilatut',
        'Kirjastovaihto',
        'Info tai muu tiedottaminen',
        'Vierailu/tutustuminen',
        'Treeni tai työhyvinvointipalvelu'
      ]
    }
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }
  
  luoCheckboxi = (label) => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  luoCheckboxiLista = (lista) => lista.map(m => this.luoCheckboxi(m))
  
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

  render() {

    const avaaKavijat = () => {
      document.getElementById("kavijoiden_valinta").classList.toggle("show")
    }

    const avaaSatamat = () => {
      document.getElementById("sataman_valinta").classList.toggle("show")
    }

    const avaaPalvelut = () => {
      document.getElementById("palveluiden_valinta").classList.toggle("show")
    }

    const avaaToimitukset = () => {
      document.getElementById("toimitusten_valinta").classList.toggle("show")
    }

    return (
      <div>
          <div className="dropdown">
            <button onClick={() => avaaKavijat()} className="dropbtn">Kävijät</button>
            <div id="kavijoiden_valinta" className="dropdown-content">
              {this.luoCheckboxiLista(this.state.kavijat)}
            </div>
          </div>
        <div className="dropdown">
          <button onClick={() => avaaSatamat()} className="dropbtn">Valitse satama</button>
          <div id="sataman_valinta" className="dropdown-content">
            {this.luoCheckboxiLista(this.state.satamat)}
          </div>
        </div>
        <div className="dropdown">
          <button onClick={() => avaaPalvelut()} className="dropbtn">Palvelut</button>
          <div id="palveluiden_valinta" className="dropdown-content">
            {this.luoCheckboxiLista(this.state.palvelut)}
          </div>
        </div>
        <div className="dropdown">
          <button onClick={() => avaaToimitukset()} className="dropbtn">Valitse toimitukset</button>
          <div id="toimitusten_valinta" className="dropdown-content">
            {this.luoCheckboxiLista(this.state.toimitukset)}
          </div>
        </div>

      </div>
    )
  }
}

export default App;
