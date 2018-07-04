import React, { Component } from 'react'
import './App.css'
import DropdownValikko from './components/DropdownValikko'
import Slideri from './components/Slideri'
import Clicker from './components/Clicker'
import Form from './components/Form'
//import CheckboxiLista from './components/CheckboxiLista'
import { Button, Label, FormGroup } from 'react-bootstrap'
import kayntiService from './services/kaynnit'
import satamaService from './services/satamat'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import NumericInput from 'react-numeric-input';
import loginService from './services/login'

// import {createStore} from 'redux'
// import listaReducer from './reducers/listaReducer'

/*
const kavijaStore = createStore(listaReducer)
const satamaStore = createStore(listaReducer)
const laivaStore = createStore(listaReducer)
const palveluStore = createStore(listaReducer)
const toimitusStore = createStore(listaReducer)
*/

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      startDate: moment(),
      kavijat: [
        {nimi: 'Ella', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Jaakko', satama: 'Helsinki, FIHEL, Vuosaari'},
        {nimi: 'Juha', satama: 'Turku, FITKU'},     
        {nimi: 'Jukka', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Katja', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Krista', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Martina', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Niklas', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Paula', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Pekka', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Päivi', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Sampsa', satama: 'Helsinki, FIHEL, Etelä'},
        {nimi: 'Tuomas', satama: 'Helsinki, FIHEL, Vuosaari'}
     
      ],
      valitutKavijat: [
      ],
      satamat: ['1. Helsinki, FIHEL, Etelä',
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
      muuSatama: '',
      valittuSatama: '',
      laivat: [
        '1. Ahti',
        '2. Aila',
        '3. Airisto',
        '4. Alppila',
        '5. Amiraali',
        '6. Amorella',
        '7. Annika Benita',
        '8. Antonia',
        '9. Aranda',
        '10. Arkadia',
        '11. Artemis',
        '12. Aura',
        '13. Auto Baltic',
        '14. Auto Bay',
        '15. Baltic Amelie',
        '16. Baltic Madonna',
        '17. Baltic Princess',
        '18. Baltica',
        '19. Birka Stockholm',
'20. Boann',
'21. Bore Bank',
'22. Bore Sea',
'23. Bore Song',
'24. Carelia',
'25.Cinderella',
'26. Containership VII',
'27. Corinne',
'28. Delfi',
'29. Eckerö',
'30. Eeva VG',
'31. Eira',
'32. Emilie',
'33. Espa',
'34. Estraden',
'35. Exporter',
'36. Fennica',
'37. Finlandia',
'38. Finnbreeze',
'39. Finncarrier',
'40. Finnclipper',
'41. Finnfellow',
'42. Finnhawk',
'43. Finnkraft',
'44. Finnlady',
'45. Finnmaid',
'46. Finnmaster',
'47. Finnmerchant',
'48. Finnmill',
'49. Finnpulp',
'50. Finnsea',
'51. Finnsky',
'52. Finnstar',
'53. Finnsun',
'54. Finntide',
'55. Finnwave',
'56. Fjärdvägen',
'57. Futura',
'58. Gabriella',
'59. Hector',
'60. Hjördis',
'61. Iso-Pukki',
'62. Jessica',
'63. Kaiku',
'64. Kallio',
'65. Kiisla',
'66. Kontio',
'67. Kraft',
'68. Kummeli',
'69. Kumpula',
'70. Kupeli',
'71. Lady Magda',
'72. Laura',
'73. Leonardo',
'74. Letto',
'75. Liikennevirasto',
'76. Linda',
'77. Link Star',
'78. Mariella',
'79. Marjatta',
'80. Martta VG',
'81. Mastera',
'82. Meri',
'83. Meteor',
'84. Midas',
'85. Mimer',
'86. Miranda',
'87. Mirva VG',
'88. Misana',
'89. Misida',
'90. Mistral',
'91. Mons',
'92. Muikku',
'93. Nathalie',
'94. Neste',
'95. Nordica',
'96. Norsky',
'97. Norstream',
'98. Northern Cross',
'99. Oili I',
'100. Oili II',
'101. Oili III',
'102. Oili IV',
'103.Otso',
'104. Pasila',
'105. Passaat',
'106. Pohjanmaa',
'107. Pohjanmeri',
'108. Polaris',
'109. Polaris VG',
'110. Prima Ballerina',
'111. Prima Celina',
'112. Prima Donna',
'113. Prima Fortuna',
'114. Prima Lady',
'115. Ramona',
'116. Rautaruukki',
'117. Retkikunnat',
'118. Riona',
'119. Rosella',
'120. Seagard',
'121. Seili',
'122. Sesta',
'123. Shipper',
'124. Silja Serenade',
'125. Silja Symphony',
'126. Sinann',
'127. Sisu',
'128. SS Saimaa',
'129. Steel',
'130. Stena Arctica',
'131. Suula',
'132. Tali',
'133. Telepaatti',
'134. Tempera',
'135. Tinto',
'136. Thetis',
'137. Thor',
'138. Ukko',
'139. Urho',
'140. Viikki',
'141. Viking FSTR',
'142. Viking Grace',
'143. Viking XPRS',
'144. Voima',
'145. Wasa Express',
'146. Zeus of Finland',
'147. Muu kotimainen laiva',
'148. Muu ulkomainen laiva'
      ],
      muuLaiva: '',
      valittuLaiva: '',
      palvelut: [
        'Laivakäynti',
        'Spotti',
        'Kuljetus',
        'Asiointipalvelut'
      ],
      valitutPalvelut: [],
      toimitukset: [
        'Videot',
        'Kirjat tilatut',
        'Kirjastovaihto',
        'Info tai muu tiedottaminen',
        'Vierailu/tutustuminen',
        'Treeni tai työhyvinvointipalvelu',
        'Lehdet',
        'Vapaavahti tai muu MEPA-materiaali'        
      ],
      valitutToimitukset: [],
      henkilot: 0,
      keskustelut: 0,
      kuljetetut: 0,
      merenkulkijoidenViesti: '',
      mepanViesti: '',
      laivaLimiter: '',
      satamaLimiter: '',
      kesto: 15
    }
  }
/*
  componentDidMount() {
    satamaService
      .getAll()
      .then(response => {
        console.log(response.data)
        this.setState({satamat: response.data})
      })
      console.log(this.state.satamat)
  }
*/

login = async (event) => {
  event.preventDefault()
  console.log('login in with', this.state.username, this.state.password)
  try{
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password
    })

    this.setState({ username: '', password: '', user})
  } catch(exception) {
    this.setState({
      error: 'käyttäjätunnus tai salasana virheellinen',
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }
}

handlePasswordChange = (event) => {
  this.setState({ password: event.target.value })
}

handleUsernameChange = (event) => {
  this.setState({ username: event.target.value })
}

ValitsePaiva = (date) => {
  this.setState({
    startDate: date
  })
  console.log(this.state.startDate._d)
}
 
valitseKavija = (e) => {
    const kavijat = this.state.valitutKavijat
    const kavija = e.target.value
    if (kavijat.includes(kavija)){
    var uusikavijalista = kavijat.filter(e => e !== kavija)
    } else {
      uusikavijalista = kavijat.concat(kavija)
    }
    this.setState({valitutKavijat: uusikavijalista})
  }

  valitsePalvelu = (e) => {
    const palvelut = this.state.valitutPalvelut
    const palvelu = e.target.value
    if (palvelut.includes(palvelu)){
    var uusipalvelulista = palvelut.filter(e => e !== palvelu)
    } else {
       uusipalvelulista = palvelut.concat(palvelu)
     }
     this.setState({valitutPalvelut: uusipalvelulista})
   }

  valitseToimitus = (e) => {
    const toimitukset = this.state.valitutToimitukset
    const toimitus = e.target.value
    if (toimitukset.includes(toimitus)){
      var uusitoimituslista = toimitukset.filter(e => e!== toimitus)
    } else {
      uusitoimituslista = toimitukset.concat(toimitus)
    }
    this.setState({valitutToimitukset: uusitoimituslista})
  }

  vaihdaLaiva = (e) => {
      this.setState({
        valittuLaiva: e.target.value
      });
  }

  vaihdaSatama = (e) => {
    this.setState({
      valittuSatama: e.target.value
    })
  }

  handleKesto = (event) => {
    this.setState({ kesto: event })
  }

  handleLaivaLimiter = (event) => {
    this.setState({ laivaLimiter: event.target.value})
  }

  handleSatamaLimiter = (event) => {
    this.setState({ satamaLimiter: event.target.value})
  }

  luoKavijaLista = () => {
    return (
      this.state.kavijat.map ((kavija) =>
      <div key={kavija.nimi}>
        <label>
        <input type="checkbox" className="checkbox"
          name="kavija" value={kavija.nimi}
          onChange={this.valitseKavija} />
        {kavija.nimi}
        </label>
      </div>
      )
    )
  }

  luoPalveluLista = () => {
    return (
      this.state.palvelut.map ((palvelu, index) =>
      <div key={palvelu}>
        <label>
        <input type="checkbox" className="checkbox"
          name="palvelu" value={palvelu}
          onChange={this.valitsePalvelu} />
          {palvelu}
         </label> 
      </div>
      )
    )
  }

  luoToimitusLista = () => {
    if (this.state.valitutPalvelut.includes('Laivakäynti') || this.state.valitutPalvelut.includes('Spotti')) {
    return (
      this.state.toimitukset.map ((toimitus) =>
      <div>
        <label>
        <input type="checkbox" className="checkbox"
          name="toimitus" value={toimitus}
          onChange={this.valitseToimitus} />
          {toimitus}
         </label> 
      </div>
      )
    )}
    else return null
  }


  luoLaivaLista = () => {
    const laivatToShow =
    this.state.laivaLimiter.length === 0 ?
    this.state.laivat :
    this.state.laivat.filter(laiva => 
      laiva.toLowerCase().includes(this.state.laivaLimiter.toLowerCase()))

    return (
      laivatToShow.map ((laiva, index) => 
        <div key={index} className="dropbtn">
          <input type="radio"
            name="laiva" value={laiva}
            onChange={this.vaihdaLaiva}/>
          {laiva}
        </div>
      )
    )
    }

  laivaRajoittaja = () => {
    return (
      <div>
      <input 
            value={this.state.laivaLimiter}
            onChange={this.handleLaivaLimiter}
            className="rajoittaja"
          />
      </div>
    )
  }
     

  luoSatamaLista = () => {
    const satamatToShow =
    this.state.satamaLimiter.length === 0 ?
    this.state.satamat :
    this.state.satamat.filter(satama => 
      satama.toLowerCase().includes(this.state.satamaLimiter.toLowerCase()))

    return (
      satamatToShow.map ((satama, index) =>
        <div key={index} className="dropbtn">
          <input type="radio"
           name="satama" value={satama}
           onChange={this.vaihdaSatama}/>
        {satama}
        </div>
      )
    )
  }

  satamaRajoittaja = () => {
    return (
      <div>
      <input 
            value={this.state.satamaLimiter}
            onChange={this.handleSatamaLimiter}
            className="rajoittaja"
          />
      </div>
    )
  }
  
  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleHenkiloChange = (event) => {
    console.log(event)
    this.setState({ henkilot: event })
  }

  handleKeskusteluChange = (event) => {
    console.log(event)
    this.setState({ keskustelut: event })
  }

  handleKuljetusChange = (event) => {
    this.setState({ kuljetetut: event })
  }

  handleTietojenLahetys = (e) => {
    e.preventDefault()
    const kaynti = {
      kavija: this.state.kavijat.toString,
      satama: this.state.valittuSatama,
      laiva: this.state.valittuLaiva,
      palvelut: this.state.valitutPalvelut,
      toimitukset: this.state.valitutToimitukset,
      kesto: this.state.kesto,
      henkiloiden_maara: this.state.henkilot,
      keskustelujen_maara: this.state.keskustelut,
      kuljetettujen_maara: this.state.kuljetetut,
      merenkulkijoiden_viesti: this.state.merenkulkijoidenViesti,
      mepan_viesti: this.state.mepanViesti
    }
    kayntiService.create(kaynti)
  }
  
  kuljetetut = () => {
    {if (this.state.valitutPalvelut.includes('Kuljetus')) 
    return (
    <div>
    <h3>Kuljetetut: </h3>
    <NumericInput mobile min={0} value={this.state.kuljetetut} onChange={this.handleKuljetusChange} />
    </div>
    )
    }
  }

  
loginForm = () => {
 return (
   <div>
  <h2>Kirjaudu</h2>

  <form onSubmit={this.login}>
<div>
käyttäjätunnus
<input
type="text"
name="username"
value={this.state.username}
onChange={this.handleFormChange}
/>
</div>
<div>
salasana
<input
type="password"
name="password"
value={this.state.password}
onChange={this.handleFormChange}
/>
</div>
<button type="submit">kirjaudu</button>
</form>
</div>
 )
}

  render() {

    return (
      <div>
        <div>

          {this.state.user === null && this.loginForm()}


          <h1>Mepan laivapalvelut</h1>
          <div>
          <p>Lähetä lomakkeen kautta tiedot laivakäynneistäsi.</p>

          <p>Laivakäyntiraporttien avulla voimme helpommin seurata palvelujemme kattavuutta sekä ohjata toimintaamme laivoille, 
            jotka eivät ole hetkeen saaneet MEPA-palveluita. Yhtenäisten raportointikäyntäntöjen kautta saamme koottua yhteen tiedot mm. siitä, 
            milloin kussakin aluksessa on viimeksi käyty.</p>



          <h2>Päivämäärä</h2>
          </div>
          <div>
          <DatePicker selected={this.state.startDate} onChange={this.ValitsePaiva} dateFormat="DD/MM/YYYY" />
          </div>
          <div>
{/*          <CheckboxiLista otsikko= "Kävijät" lista={this.state.kavijat} onChange={this.valitseKavija} />    */}
          <h2>Kävijät</h2>
          {this.luoKavijaLista()}
          </div>
          <div>
          <DropdownValikko otsikko="Valitse satama" listaaja= {this.luoSatamaLista()} rajoittaja= {this.satamaRajoittaja()} valittu={this.state.valittuSatama} />          
          <DropdownValikko otsikko= "Valitse laiva" listaaja= {this.luoLaivaLista()} rajoittaja= {this.laivaRajoittaja()} valittu={this.state.valittuLaiva} />
          </div>
          <div>
 {/*         <CheckboxiLista otsikko="Palvelut" lista={this.state.palvelut} />  */}
          <h2>Palvelut</h2>
          {this.luoPalveluLista()}
          </div>
          <div>
          <h2>Toimitukset</h2>
{/*          <CheckboxiLista otsikko= "Toimitukset" lista={this.state.toimitukset} />  */}
          {this.luoToimitusLista()}
          </div>
          <h2>Käynnin kesto (min)</h2>
          <div>
          <NumericInput min={0} max={300} step={5} value={this.state.kesto}  onChange={this.handleKesto} style={ false } />
          <Slideri onChange={this.handleKesto} defaultValue ={this.state.kesto} value={this.state.kesto} />
          </div>
          <div>
          <h3>Henkilöiden määrä: </h3> 
          <NumericInput mobile min={0} value={this.state.henkilot} onChange={this.handleHenkiloChange} /> 
          </div>
          <div>
          <h3>Keskustelut: </h3>
          <NumericInput mobile min={0}  value={this.state.keskustelut} onChange={this.handleKeskusteluChange} /> 
          </div>
          {this.kuljetetut()}          
          <div>
          <Form handleChange={this.handleFormChange} 
            value={this.state.merenkulkijoidenViesti} aihe="merenkulkijoidenViesti" otsikko= "Merenkulkijoiden viesti" />
          </div>
          <div>
          <Form handleChange={this.handleFormChange} 
            value={this.state.mepanViesti} aihe="mepanViesti" otsikko= "Mepan viesti" />
          </div>
          <Button bsStyle="primary" onClick={this.handleTietojenLahetys}>Lähetä</Button>
        </div>
      </div>
    )
  }
}

export default App;