import React, { Component } from "react"
import laivaService from "../services/laivat"
import kansalaisuusService from "../services/kansalaisuudet"

class LisaaLaiva extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nimi: "",
      lippu: "",
      kansalaisuus: "",
      kansalaisuudet: []
    }
  }

  //  TÄSTÄ PUUTTUU KANSALAISUUKSIEN LINKITTÄMINEN LAIVAAN!!!
  //  TÄYTYY FIKSATA ENNENKUIN VOI LAITTAA TUOTANTOON
  //

  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  lisaaKansalaisuus = event => {
    event.preventDefault()
    const kansalaisuudet = this.state.kansalaisuudet
    const kansalaisuus = this.state.kansalaisuus
    if (kansalaisuudet.includes(kansalaisuus)) {
      var uusikansalaisuuslista = kansalaisuudet.filter(e => e !== kansalaisuus)
    } else {
      uusikansalaisuuslista = kansalaisuudet.concat(kansalaisuus)
    }
    this.setState({ kansalaisuudet: uusikansalaisuuslista })
    this.setState({ kansalaisuus: "" })
  }

  poistaKansalaisuus = event => {
    event.preventDefault()
    const kansalaisuudet = this.state.kansalaisuudet
    if (kansalaisuudet.includes(event.target.value)) {
      var uusikansalaisuuslista = kansalaisuudet.filter(
        e => e !== event.target.value
      )
    }
    this.setState({ kansalaisuudet: uusikansalaisuuslista })
  }

  listaaKansalaisuudet = () => {
    return this.state.kansalaisuudet.map(k => (
      <div>
        <div>
          {k}
          <button
            name="kansalaisuus"
            value={k}
            onClick={this.poistaKansalaisuus}
          >
            poista
          </button>
        </div>
      </div>
    ))
  }

  lisaaLaiva = async event => {
    event.preventDefault()
    try {
      await laivaService.create({
        nimi: this.state.nimi,
        lippu: this.state.lippu,
        kansalaisuudet: this.state.kansalaisuudet
      }).then
      this.setState({
        nimi: "",
        lippu: "",
        kansalaisuudet: []
      })
    } catch (exception) {
      console.log("laivan lisääminen epäonnistui")
    }
  }

  render() {
    return (
      <form onSubmit={this.lisaaLaiva}>
        <h2> Lisää laiva tietokantaan</h2>

        <div>
          Nimi <br />
          <input
            type="text"
            name="nimi"
            value={this.state.nimi}
            onChange={this.handleFormChange}
          />
        </div>
        <div>
          Lippu <br />
          <input
            type="text"
            name="lippu"
            value={this.state.lippu}
            onChange={this.handleFormChange}
          />
        </div>
        <div>
          Lisää kansalaisuus <br />
          <input
            type="text"
            name="kansalaisuus"
            value={this.state.kansalaisuus}
            onChange={this.handleFormChange}
          />
          <button onClick={this.lisaaKansalaisuus}>Lisää</button>
        </div>
        <div>Nimi: {this.state.nimi}</div>
        <div>Lippu: {this.state.lippu}</div>
        <div>Kansalaisuudet: {this.listaaKansalaisuudet()}</div>

        <button type="submit">Lisää laiva</button>
      </form>
    )
  }
}

export default LisaaLaiva
