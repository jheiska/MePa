import React, { Component } from 'react'

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, e } = this.props

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ))
    handleCheckboxChange(e)
  }

  render() {
    const { label } = this.props
    const { isChecked } = this.state

    return (
      <div>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            name={label}
            key={label}
            id={label}
            checked={isChecked}
            onChange={this.handleCheckboxChange}
          />
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox