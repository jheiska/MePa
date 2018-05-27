import React, { Component } from 'react'
import Checkbox from './Checkbox'

class CheckboxiLista extends Component {

    state = {
        list: []
      }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set()
 //       this.setState({list: this.props.lista})
      }
    
    toggleCheckbox = (label) => {
      if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label)
      } else {
          this.selectedCheckboxes.add(label)
      }
    }
    
    luoCheckboxi = (label) => (
      <Checkbox
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
      />
    )

    luoCheckboxiLista  = (lista) => lista.map(m => this.luoCheckboxi(m))

    render() {
        return (
            <div key= {this.props.otsikko} id ={this.props.otsikko} >
            <h2>{this.props.otsikko}</h2>
            {this.luoCheckboxiLista(this.props.lista)}
            </div>
        )
    }
}

export default CheckboxiLista