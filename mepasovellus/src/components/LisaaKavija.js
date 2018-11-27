import React, { Component } from "react"
import kavijaService from "../services/kavijat"

class LisaaKavija extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      nimi: "",
      oletussatama: ""
    }
  }

  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  lisaaKavija = async event => {
    event.preventDefault()
    try {
      await kavijaService.create({
        username: this.state.username,
        password: this.state.password,
        nimi: this.state.nimi,
        oletussatama: this.state.oletussatama
      }).then
      this.setState({
        nimi: "",
        username: "",
        password: "",
        oletussatama: ""
      })
    } catch (exception) {
      console.log("käyttäjän lisääminen epäonnistui")
    }
  }

  render() {
    return (
      <form onSubmit={this.lisaaKavija}>
        <div>
          <div>
            Nimi
            <br />
            <input
              type="text"
              name="nimi"
              value={this.state.nimi}
              onChange={this.handleFormChange}
            />
          </div>
          <div>
            Sähköposti (toimii käyttäjätunnuksena)
            <br />
            <input
              type="username"
              name="username"
              value={this.state.username}
              onChange={this.handleFormChange}
            />
          </div>
          <div>
            Salasana
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFormChange}
            />
          </div>
          <div>
            Oletussatama
            <br />
            <input
              type="text"
              name="oletussatama"
              value={this.state.oletussatama}
              onChange={this.handleFormChange}
            />
          </div>
        </div>
        <button type="submit">Lisää kävijä</button>
      </form>
    )
  }
}

export default LisaaKavija
