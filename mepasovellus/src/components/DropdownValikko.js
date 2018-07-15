import React, { Component } from "react"

class DropdownValikko extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)

    this.state = {
      popupVisible: false
    }
  }

  handleClick() {
    if (!this.state.popupVisible) {
      document.addEventListener("click", this.handleOutsideClick, false)
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false)
    }

    var newState = !this.state.popupVisible
    this.setState({
      popupVisible: newState
    })
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return
    }

    this.handleClick()
  }

  render() {
    const { otsikko, rajoittaja, listaaja, valittu } = this.props
    return (
      <div
        className="dropdown"
        ref={node => {
          this.node = node
        }}
      >
        <button onClick={this.handleClick}>{otsikko}</button>
        {this.state.popupVisible && (
          <div id={otsikko} className="dropdown-content">
            {rajoittaja}
            {listaaja}
          </div>
        )}
        <div className="dropdown-content">Valittuna: {valittu}</div>
      </div>
    )
  }
}

export default DropdownValikko
