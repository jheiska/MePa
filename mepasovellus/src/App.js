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
//import kansalaisuusService from "./services/kansalaisuudet"
import LisaaLaiva from "./components/lisaaLaiva"
import LisaaKavija from "./components/LisaaKavija"
import Ilmoitus from "./components/Ilmoitus"
import Logout from "./components/Logout"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      user: null,
      viesti: { tyyppi: null, viesti: null },
      startDate: moment(),
      kavijat: [],
      uusiKavija: "",
      valitutKavijat: [],
      satamat: [],
      valittuSatama: null,
      laivat: [],
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
      kesto: 15,
      kaynnit: [],
      kansalaisuudet: []
    }
  }
  // LUO SATAMAT TIETOKANTAAN!
  componentDidMount = async () => {
    const satamat = await satamaService.getAll()
    this.setState({ satamat })
    const laivat = await laivaService.getAll()
    this.setState({ laivat })
    const kaynnit = await kayntiService.getAll()
    this.setState({ kaynnit })
    const kavijat = await kavijaService.getAll()
    this.setState({ kavijat })
    const KayttajaJSON = window.localStorage.getItem("kirjautunutKayttaja")
    if (KayttajaJSON) {
      const user = JSON.parse(KayttajaJSON)
      const valittuSatama = this.haeSatamaKoodilla(user.oletussatama)
      console.log(valittuSatama)
      this.setState({
        user,
        valittuSatama,
        valitutKavijat: this.state.valitutKavijat.concat(user.nimi)
      })
      kayntiService.setToken(user.token)
    }
  }

  login = async event => {
    event.preventDefault()
    console.log("login in with", this.state.username, this.state.password)
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log(user)
      window.localStorage.setItem("kirjautunutKayttaja", JSON.stringify(user))
      const satama = this.haeSatamaKoodilla(user.oletussatama)
      kayntiService.setToken(user.token)
      this.setState({
        username: "",
        password: "",
        user,
        valitutKavijat: this.state.valitutKavijat.concat(user.nimi),
        valittuSatama: satama
      })
    } catch (exception) {
      this.handleViesti("virhe", "käyttäjätunnus tai salasana virheellinen")
      this.setState({ password: "" })
    }
  }

  handleViesti = (tyyppi, teksti) => {
    this.setState({ viesti: { tyyppi: tyyppi, viesti: teksti } })
    setTimeout(() => {
      this.setState({ viesti: { tyyppi: null, viesti: null } })
    }, 5000)
  }

  handleLogout = e => {
    this.setState({
      user: null,
      username: "",
      password: "",
      valitutKavijat: [],
      valittuSatama: ""
    })
    window.localStorage.removeItem("kirjautunutKayttaja")
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

  vaihdaLaiva = event => {
    const etsiLaiva = laiva => {
      return laiva.nimi === event.target.value
    }
    const uusiLaiva = this.state.laivat.find(etsiLaiva)
    this.setState({ valittuLaiva: uusiLaiva })
  }

  vaihdaSatama = event => {
    const uusiSatama = this.haeSatamaKoodilla(event.target.value)
    this.setState({ valittuSatama: uusiSatama })
  }

  haeSatamaKoodilla = haku => {
    console.log(haku)
    console.log(this.state.satamat)
    const uusiSatama = this.state.satamat.find(s => {
      console.log(s.koodi, haku)
      return s.koodi === haku
    })

    return uusiSatama
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
    const kavijat = this.state.user.username.includes("mepa.fi")
      ? this.state.kavijat.filter(k => k.username.includes("mepa.fi"))
      : this.state.kavijat

    return (
      <div>
        <div key={this.state.user.nimi}>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              name="kavija"
              value={this.state.user.nimi}
              onChange={this.valitseKavija}
              checked={true}
              disabled
            />
            {this.state.user.nimi}
          </label>
        </div>
        {kavijat.map(kavija =>
          kavija.nimi !== this.state.user.nimi && kavija.nimi !== "admin" ? (
            <div key={kavija.nimi}>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  name="kavija"
                  value={kavija.nimi}
                  onChange={this.valitseKavija}
                  checked={this.state.valitutKavijat.includes(kavija.nimi)}
                />
                {kavija.nimi}
              </label>
            </div>
          ) : null
        )}
      </div>
    )
  }

  kavijanLisaaja = () => {
    return (
      <div>
        <div>
          <input
            type="text"
            name="uusiKavija"
            value={this.state.uusiKavija}
            onChange={this.handleFormChange}
          />
          <br />
          <br />
        </div>

        <div>
          <button onClick={this.lisaaKavija}>Lisää</button>
        </div>
      </div>
    )
  }

  lisaaKavija = event => {
    event.preventDefault()
    if (this.state.uusiKavija !== "") {
      const kavijat = this.state.kavijat
      const kavija = {
        id: 999999,
        nimi: this.state.uusiKavija,
        oletussatama: "",
        username: "uusi@mepa.fi"
      }

      const uusikavijalista = kavijat.concat(kavija)

      this.setState({ kavijat: uusikavijalista })
      this.setState({ uusiKavija: "" })
    }
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
            checked={this.state.valitutPalvelut.includes(palvelu)}
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
      return this.state.toimitukset.map((toimitus, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              name="toimitus"
              value={toimitus}
              onChange={this.valitseToimitus}
              checked={this.state.valitutToimitukset.includes(toimitus)}
            />
            {toimitus}
          </label>
        </div>
      ))
    } else return null
  }

  laivanTiedot = () => {
    if (this.state.valittuLaiva === "") {
      return null
    }
    return (
      <div>
        <div>Valittu laiva:</div>
        <ul>
          <li>Nimi: {this.state.valittuLaiva.nimi}</li>
          <li>Lippu: {this.state.valittuLaiva.lippu}</li>
          <li>
            Kansalaisuudet:{" "}
            {this.state.valittuLaiva.kansalaisuudet.map(kansalaisuus => (
              <div key={kansalaisuus.id}>{kansalaisuus}</div>
            ))}
          </li>
        </ul>
      </div>
    )
  }

  laivaRajoittaja = () => {
    return (
      <div>
        <input
          value={this.state.laivaLimiter}
          onChange={this.handleLaivaLimiter}
          className="laivaRajoittaja"
        />
      </div>
    )
  }

  luoLaivaLista = () => {
    const laivatToShow =
      this.state.laivaLimiter.length === 0
        ? this.state.laivat
        : this.state.laivat.filter(laiva =>
            laiva.nimi
              .toLowerCase()
              .includes(this.state.laivaLimiter.toLowerCase())
          )

    return laivatToShow.map((laiva, index) => (
      <div key={index}>
        <button
          className="dropbtn"
          //         type="button"
          name="laiva"
          value={laiva.nimi}
          onClick={this.vaihdaLaiva}
        >
          {laiva.nimi}
        </button>
      </div>
    ))
  }

  luoSatamaLista = () => {
    const satamatToShow =
      this.state.satamaLimiter.length === 0
        ? this.state.satamat
        : this.state.satamat.filter(satama =>
            satama.kaupunki
              .toLowerCase()
              .concat(satama.koodi.toLowerCase())
              .includes(this.state.satamaLimiter.toLowerCase())
          )

    return satamatToShow.map((satama, index) => (
      <div key={index}>
        <button
          className="dropbtn"
          name="satama"
          value={satama.koodi}
          onClick={this.vaihdaSatama}
        >
          {satama.kaupunki}, {satama.koodi}
        </button>
      </div>
    ))
  }

  satamanTiedot = () =>
    this.state.valittuSatama != null ? (
      <div>
        Valittu satama: {this.state.valittuSatama.kaupunki},{" "}
        {this.state.valittuSatama.koodi}
      </div>
    ) : null

  satamaRajoittaja = () => {
    return (
      <div>
        <input
          value={this.state.satamaLimiter}
          onChange={this.handleSatamaLimiter}
          className="satamaRajoittaja"
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
    if (this.state.valittuLaiva === "" || this.state.valittuLaiva === null) {
      this.handleViesti("virhe", "Laivan valinta puuttuu!")
    } else if (
      this.state.valittuSatama === "" ||
      this.state.valittuSatama === null ||
      this.state.valittuSatama === undefined
    ) {
      this.handleViesti("virhe", "Sataman valinta puuttuu!")
    } else if (
      this.state.valitutPalvelut.length === 0 ||
      this.state.valitutPalvelut === null
    ) {
      this.handleViesti("virhe", "Palveluiden valinta puuttuu!")
    } else {
      const kaynti = {
        pvm: this.state.startDate,
        kayttaja: this.state.user.nimi,
        kavijat: this.state.valitutKavijat,
        satama: this.state.valittuSatama.koodi,
        laivaId: this.state.valittuLaiva.id,
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
      this.handleViesti("onnistuminen", "Lomake lähetetty. Kiitos!")
      // käyttäjä, satama ja kävijät pysyvät samoina kuin ennen, muut nollataan.
      this.setState({
        valitutKavijat: [],
        valittuLaiva: "",
        valitutPalvelut: [],
        valitutToimitukset: [],
        kesto: 15,
        henkilot: 0,
        keskustelut: 0,
        kuljetetut: 0,
        merenkulkijoidenViesti: "",
        mepanViesti: ""
      })
    }
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
            <Ilmoitus viesti={this.state.viesti} />
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
            {this.kavijanLisaaja()}
            <br />
            <br />
          </div>
          <div>
            <div>{this.satamanTiedot()}</div>
            <DropdownValikko
              otsikko="Vaihda satama"
              listaaja={this.luoSatamaLista()}
              rajoittaja={this.satamaRajoittaja()}
            />
            <div>{this.laivanTiedot()}</div>
            <DropdownValikko
              otsikko="Valitse laiva"
              listaaja={this.luoLaivaLista()}
              rajoittaja={this.laivaRajoittaja()}
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
              defaultValue={15}
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
          <Ilmoitus viesti={this.state.viesti} />
          <button onClick={this.tietojenLahetys}>Lähetä</button>
        </div>
      </div>
    )
  }

  kaynnitList = () => {
    return this.state.kaynnit.map((kaynti, index) => (
      <ul key={index}>
        <li>Käyttäjä: {kaynti.kayttaja}</li>
        <li>
          Kävijät:{" "}
          {kaynti.kavijat.map(kavija => (
            <div key={kavija}>{kavija}</div>
          ))}
        </li>
        <li>Satama: {kaynti.satama}</li>
        <li>Palvelut: {kaynti.palvelut}</li>
        <li>Toimitukset: {kaynti.toimitukset}</li>
        <li>Kesto: {kaynti.kesto}</li>
        <li>Henkilöiden määrä: {kaynti.henkiloiden_maara}</li>
        <li>Keskustelujen määrä: {kaynti.keskustelujen_maara}</li>
        <li>Kuljetettujen määrä: {kaynti.kuljetettujen_maara}</li>
        <li>Merenkulkijoiden viesti: {kaynti.merenkulkijoiden_viesti}</li>
        <li>Mepan viesti: {kaynti.mepan_viesti}</li>
        <li>Laivan nimi: {kaynti.laiva[0]}</li>
        <li>Laivan lippu: {kaynti.laiva[1]}</li>
        <li>Laivan kansalaisuudet: {kaynti.laiva[2]}</li>
      </ul>
    ))
  }

  adminForm = () => {
    return (
      <div>
        {/*        <LisaaLaiva kansalaisuudet={this.state.kansalaisuudet} /> */}
        <LisaaKavija satamat={this.state.satamat} />
        <DropdownValikko
          listaaja={this.kaynnitList()}
          otsikko={"käyntilista"}
        />
      </div>
    )
  }

  forminVaihtaja = () => {
    var sivu = null
    if (this.state.user === null) {
      sivu = this.loginForm()
    } else if (this.state.user.nimi === "admin") {
      sivu = this.adminForm()
    } else {
      sivu = this.mepaForm()
    }
    return <div>{sivu}</div>
  }

  render() {
    return (
      <div>
        <div>{this.forminVaihtaja()}</div>
        <Logout outLogger={this.handleLogout} user={this.state.user} />
      </div>
    )
  }
}

export default App
