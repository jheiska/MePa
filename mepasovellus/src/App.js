import React, { Component } from 'react';
import './App.css'
import Checkbox from './components/Checkbox'
import DropdownValikko from './components/DropdownValikko'

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
      palvelut: [
        'Laivakäynti',
        'Spotti',
        'Kuljetus',
        'Asiointipalvelut'
      ],
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

  avaaKavijat = () => {
    document.getElementById("Kavijat").classList.toggle("show")
  }

  avaaSatamat = () => {
    document.getElementById("Satamat").classList.toggle("show")
  }

  avaaPalvelut = () => {
    document.getElementById("Palvelut").classList.toggle("show")
  }

  avaaToimitukset = () => {
    document.getElementById("Toimitukset").classList.toggle("show")
  }

  render() {

    return (
      <div>
        <DropdownValikko otsikko= "Kavijat" toggleri= {this.avaaKavijat} listaaja= {this.luoCheckboxiLista(this.state.kavijat)} />
        <DropdownValikko otsikko= "Satamat" toggleri= {this.avaaSatamat} listaaja= {this.luoCheckboxiLista(this.state.satamat)} />
        <DropdownValikko otsikko= "Palvelut" toggleri= {this.avaaPalvelut} listaaja= {this.luoCheckboxiLista(this.state.palvelut)} />
        <DropdownValikko otsikko= "Toimitukset" toggleri= {this.avaaToimitukset} listaaja= {this.luoCheckboxiLista(this.state.toimitukset)} />
      </div>
    )
  }
}


/*        
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
*/


export default App;
