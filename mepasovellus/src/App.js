import React, { Component } from "react"
import "./App.css"
import DropdownValikko from "./components/DropdownValikko"
import Slideri from "./components/Slideri"
import Form from "./components/Form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import moment from "moment"
import NumericInput from "react-numeric-input"
import kayntiService from "./services/kaynnit"
import satamaService from "./services/satamat"
import loginService from "./services/login"
import kavijaService from "./services/kavijat"
import laivaService from "./services/laivat"
import LisaaLaiva from "./components/lisaaLaiva"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      user: null,
      startDate: moment(),
      kavijat: [
        { nimi: "Ella", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Jaakko", satama: "Helsinki, FIHEL, Vuosaari" },
        { nimi: "Juha", satama: "Turku, FITKU" },
        { nimi: "Jukka", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Katja", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Krista", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Martina", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Niklas", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Paula", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Pekka", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Päivi", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Sampsa", satama: "Helsinki, FIHEL, Etelä" },
        { nimi: "Tuomas", satama: "Helsinki, FIHEL, Vuosaari" }
      ],
      valitutKavijat: [],
      satamat: [],
      muuSatama: "",
      valittuSatama: [],
      laivat: [],
      muuLaiva: "",
      valittuLaiva: "",
      palvelut: ["Laivakäynti", "Spotti", "Kuljetus", "Asiointipalvelut"],
      valitutPalvelut: [],
      toimitukset: [
        "Videot",
        "Kirjat tilatut",
        "Kirjastovaihto",
        "Info tai muu tiedottaminen",
        "Vierailu/tutustuminen",
        "Treeni tai työhyvinvointipalvelu",
        "Lehdet",
        "Vapaavahti tai muu MEPA-materiaali"
      ],
      valitutToimitukset: [],
      henkilot: 0,
      keskustelut: 0,
      kuljetetut: 0,
      merenkulkijoidenViesti: "",
      mepanViesti: "",
      laivaLimiter: "",
      satamaLimiter: "",
      kesto: 15
    }
  }
  // LUO SATAMAT TIETOKANTAAN!
  componentDidMount() {
    satamaService.getAll().then(satamat => {
      this.setState({ satamat })
    })
    kavijaService.getAll().then(kavijat => {
      this.setState({ kavijat })
    })
    laivaService.getAll().then(laivat => {
      this.setState({ laivat })
    })
  }

  login = async event => {
    event.preventDefault()
    console.log("login in with", this.state.username, this.state.password)
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({
        username: "",
        password: "",
        user,
        valittuSatama: user.oletussatama,
        valitutKavijat: this.state.valitutKavijat.concat(user.nimi)
      })
      this.setState({ valittuSatama: user.oletussatama })
    } catch (exception) {
      this.setState({
        error: "käyttäjätunnus tai salasana virheellinen"
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value })
  }

  ValitsePaiva = date => {
    this.setState({
      startDate: date
    })
    console.log(this.state.startDate._d)
  }

  valitseKavija = e => {
    const kavijat = this.state.valitutKavijat
    const kavija = e.target.value
    if (kavijat.includes(kavija)) {
      var uusikavijalista = kavijat.filter(e => e !== kavija)
    } else {
      uusikavijalista = kavijat.concat(kavija)
    }
    this.setState({ valitutKavijat: uusikavijalista })
  }

  valitsePalvelu = e => {
    const palvelut = this.state.valitutPalvelut
    const palvelu = e.target.value
    if (palvelut.includes(palvelu)) {
      var uusipalvelulista = palvelut.filter(e => e !== palvelu)
    } else {
      uusipalvelulista = palvelut.concat(palvelu)
    }
    this.setState({ valitutPalvelut: uusipalvelulista })
  }

  valitseToimitus = e => {
    const toimitukset = this.state.valitutToimitukset
    const toimitus = e.target.value
    if (toimitukset.includes(toimitus)) {
      var uusitoimituslista = toimitukset.filter(e => e !== toimitus)
    } else {
      uusitoimituslista = toimitukset.concat(toimitus)
    }
    this.setState({ valitutToimitukset: uusitoimituslista })
  }

  vaihdaLaiva = e => {
    this.setState({
      valittuLaiva: e.target.value
    })
  }

  vaihdaSatama = e => {
    this.setState({
      valittuSatama: e.target.value
    })
  }

  vaihdaKesto = event => {
    this.setState({ kesto: event })
  }

  handleLaivaLimiter = event => {
    this.setState({ laivaLimiter: event.target.value })
  }

  handleSatamaLimiter = event => {
    this.setState({ satamaLimiter: event.target.value })
  }

  luoKavijaLista = () => {
    return this.state.kavijat.map(kavija => (
      <div key={kavija.nimi}>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            name="kavija"
            value={kavija.nimi}
            onChange={this.valitseKavija}
          />
          {kavija.nimi}
        </label>
      </div>
    ))
  }

  luoPalveluLista = () => {
    return this.state.palvelut.map((palvelu, index) => (
      <div key={palvelu}>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            name="palvelu"
            value={palvelu}
            onChange={this.valitsePalvelu}
          />
          {palvelu}
        </label>
      </div>
    ))
  }

  luoToimitusLista = () => {
    if (
      this.state.valitutPalvelut.includes("Laivakäynti") ||
      this.state.valitutPalvelut.includes("Spotti")
    ) {
      return this.state.toimitukset.map(toimitus => (
        <div>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              name="toimitus"
              value={toimitus}
              onChange={this.valitseToimitus}
            />
            {toimitus}
          </label>
        </div>
      ))
    } else return null
  }

  luoLaivaLista = () => {
    const laivatToShow =
      this.state.laivaLimiter.length === 0
        ? this.state.laivat
        : this.state.laivat.filter(laiva =>
            laiva.toLowerCase().includes(this.state.laivaLimiter.toLowerCase())
          )

    return laivatToShow.map((laiva, index) => (
      <div key={index} className="dropbtn">
        <input
          type="radio"
          name="laiva"
          value={laiva.nimi}
          onChange={this.vaihdaLaiva}
        />
        {laiva.nimi}
      </div>
    ))
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
      this.state.satamaLimiter.length === 0
        ? this.state.satamat
        : this.state.satamat.filter(satama =>
            satama
              .toLowerCase()
              .includes(this.state.satamaLimiter.toLowerCase())
          )

    return satamatToShow.map((satama, index) => (
      <div key={index} className="dropbtn">
        <input
          type="radio"
          name="satama"
          value={satama.koodi}
          onChange={this.vaihdaSatama}
        />
        {satama.kaupunki}, {satama.koodi}
      </div>
    ))
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

  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  vaihdaHenkilot = event => {
    this.setState({ henkilot: event })
  }

  vaihdaKeskustelut = event => {
    this.setState({ keskustelut: event })
  }

  vaihdaKuljetetut = event => {
    this.setState({ kuljetetut: event })
  }

  tietojenLahetys = e => {
    e.preventDefault()
    const kaynti = {
      kavija: this.state.kavijat.toString,
      satama: this.state.valittuSatama,
      laiva: this.state.valittuLaiva.nimi,
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
    {
      if (this.state.valitutPalvelut.includes("Kuljetus"))
        return (
          <div>
            <h3>Kuljetetut: </h3>
            <NumericInput
              mobile
              min={0}
              value={this.state.kuljetetut}
              onChange={this.vaihdaKuljetetut}
            />
          </div>
        )
    }
  }

  loginForm = () => {
    return (
      <div className="intro">
        <h2>Mepa-laivakäyntisovellus</h2>
        <br />
        <br />
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
          <div>
            <br />
            <br />
            <button type="submit">kirjaudu</button>
          </div>
        </form>
      </div>
    )
  }

  mepaForm = () => {
    return (
      <div>
        <div>
          <h1>Mepan laivapalvelut</h1>
          <div>
            <p className="intro">
              Lähetä lomakkeen kautta tiedot laivakäynneistäsi.
              <br />
              <br />
              Laivakäyntiraporttien avulla voimme helpommin seurata palvelujemme
              kattavuutta sekä ohjata toimintaamme laivoille, jotka eivät ole
              hetkeen saaneet MEPA-palveluita. Yhtenäisten
              raportointikäyntäntöjen kautta saamme koottua yhteen tiedot mm.
              siitä, milloin kussakin aluksessa on viimeksi käyty.
            </p>
            <br />
            <div>
              <h2>Päivämäärä</h2>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.ValitsePaiva}
                dateFormat="DD/MM/YYYY"
              />
              <br />
              <br />
            </div>
          </div>
          <div>
            <h2>Kävijät</h2>
            {this.luoKavijaLista()}
            <br />
            <br />
          </div>
          <div>
            <DropdownValikko
              otsikko="Valitse satama"
              listaaja={this.luoSatamaLista()}
              rajoittaja={this.satamaRajoittaja()}
              valittu={this.state.valittuSatama}
            />
            <DropdownValikko
              otsikko="Valitse laiva"
              listaaja={this.luoLaivaLista()}
              rajoittaja={this.laivaRajoittaja()}
              valittu={this.state.valittuLaiva}
            />
          </div>
          <div>
            <br />
            <br />

            <h2>Palvelut</h2>
            {this.luoPalveluLista()}
            <span>
              <h2>Toimitukset</h2>
              {this.luoToimitusLista()}
            </span>
          </div>
          <h2>Käynnin kesto (min)</h2>
          <div>
            <NumericInput
              min={0}
              max={300}
              step={5}
              value={this.state.kesto}
              onChange={this.vaihdaKesto}
              style={false}
            />
            <Slideri
              name="kesto"
              onChange={this.vaihdaKesto}
              defaultValue={this.state.kesto}
              value={this.state.kesto}
            />
          </div>
          <div>
            <h3>Henkilöiden määrä: </h3>
            <NumericInput
              mobile
              min={0}
              value={this.state.henkilot}
              onChange={this.vaihdaHenkilot}
            />
          </div>
          <div>
            <h3>Keskustelut: </h3>
            <NumericInput
              mobile
              min={0}
              value={this.state.keskustelut}
              onChange={this.vaihdaKeskustelut}
            />
          </div>
          {this.kuljetetut()}
          <br />
          <br />
          <div>
            <Form
              handleChange={this.handleFormChange}
              value={this.state.merenkulkijoidenViesti}
              aihe="merenkulkijoidenViesti"
              otsikko="Merenkulkijoiden viesti"
            />
          </div>
          <br />
          <br />
          <div>
            <Form
              handleChange={this.handleFormChange}
              value={this.state.mepanViesti}
              aihe="mepanViesti"
              otsikko="Mepan viesti"
            />
            <br />
            <br />
          </div>
          <button onClick={this.tietojenLahetys}>Lähetä</button>
        </div>
      </div>
    )
  }

  adminForm = () => {
    return <LisaaLaiva />
  }

  forminVaihtaja = () => {
    var sivu = null
    if (this.state.user === null) {
      sivu = this.loginForm()
    } else if (this.state.user.nimi === "admin") {
      sivu = this.adminForm()
    } else if (this.state.user != "admin") {
      sivu = this.mepaForm()
    }
    return <div>{sivu}</div>
  }

  render() {
    return (
      //      <div>{this.state.user === null ? this.loginForm() : this.mepaForm()}</div>
      <div>{this.forminVaihtaja()}</div>
    )
  }
}

export default App
