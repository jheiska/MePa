import React, { Component } from 'react'
import NumericInput from 'react-numeric-input';

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

  handleClicks = (clicks) => {
    this.setState({ clicks })
  }

  render() {
    const { label } = this.props;

    return (
      <div className="wrapper">
        <h3>{label}</h3> 
        <button className="button" onClick={this.DecreaseItem}> - </button>
        <NumericInput value={this.state.clicks}  onChange={this.handleClicks} style={ false } />
        <button className="button" onClick={this.IncrementItem}> + </button>
      </div>
    )
  }
}

export default Clicker