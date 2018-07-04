import React, { Component } from 'react'


class Clicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicks: 0
    }
  }

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 })
  }
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 })
  }

  render() {
    const { label } = this.props;

    return (
      <div className="wrapper">
        <h3>{label}</h3> 
        <button className="button" onClick={this.DecreaseItem}> - </button>
        {this.state.clicks}
        <button className="button" onClick={this.IncrementItem}> + </button>
      </div>
    )
  }
}

export default Clicker