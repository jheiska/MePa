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
      <div class="wrapper">
        {label} 
        <button class="button" onClick={this.DecreaseItem}>-</button>
        {this.state.clicks}
        <button class="button" onClick={this.IncrementItem}>+</button>
      </div>
    )
  }
}

export default Clicker