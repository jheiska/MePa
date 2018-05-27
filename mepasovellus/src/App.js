import React, { Component } from 'react';
import './App.css'
import DropdownValikko from './components/DropdownValikko'
import Slideri from './components/Slideri'
import Clicker from './components/Clicker'
import Form from './components/Form'
import CheckboxiLista from './components/CheckboxiLista';

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
      valitutKavijat: [
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
      merenKulkijoidenViesti: '',
      mepanViesti: '',
      laivaLimiter: '',
      satamaLimiter: ''
    }
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

  handleLaivaLimiter = (event) => {
    this.setState({ laivaLimiter: event.target.value})
  }

  handleSatamaLimiter = (event) => {
    this.setState({ satamaLimiter: event.target.value})
  }

  luoLaivaLista = () => {
    const laivatToShow =
    this.state.laivaLimiter.length === 0 ?
    this.state.laivat :
    this.state.laivat.filter(laiva => 
      laiva.toLowerCase().includes(this.state.laivaLimiter.toLowerCase()))

    return (
      laivatToShow.map ((laiva, index) => 
        <div key={index}>
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
        <div key={index}>
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
          />
      </div>
    )
  }
  
  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  saveForm = () => {
    console.log("tallennus puuttuu")
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  }
/*
  toimitukset = () => {
    if (document.getElementById('Palvelut').selectedCheckboxes.has('Laivakäynti')){
      return <CheckboxiLista otsikko= "Toimitukset" lista={this.state.toimitukset} />
    } else return null

  }
  */

//          <CheckboxiLista otsikko= "Toimitukset" lista={this.state.toimitukset} />

  render() {

    return (
      <div>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <CheckboxiLista otsikko= "Kävijät" lista={this.state.kavijat} />
            <button className="btn btn-default" type="submit">Save</button>
          </form>
          <div>
          <DropdownValikko otsikko= "Satamat" listaaja= {this.luoSatamaLista()} rajoittaja= {this.satamaRajoittaja()} />
          </div>
          <div>
          <DropdownValikko otsikko= "Laivat" listaaja= {this.luoLaivaLista()} rajoittaja= {this.laivaRajoittaja()} />
          </div>
          <CheckboxiLista otsikko="Palvelut" lista={this.state.palvelut} />

          <Slideri />
        </div>
        <div>
          <Clicker label="Henkilöiden määrä: " />
        </div>
        <div>
          <Clicker label="Keskustelut: " />
        </div>
        <div>
          <Clicker label="Kuljetetut: " />
        </div>
        <div>
          <Form onSubmit={this.saveForm} handleChange={this.handleFormChange} 
          value={this.state.merenKulkijoidenViesti} aihe="merenKulkijoidenViesti" otsikko= "Merenkulkijoiden viesti" />
        </div>
        <div>
          <Form onSubmit={this.saveForm} handleChange={this.handleFormChange} 
          value={this.state.mePanViesti} aihe="mepanViesti" otsikko= "Mepan viesti" />
        </div>
      </div>
    )
  }
}

export default App;