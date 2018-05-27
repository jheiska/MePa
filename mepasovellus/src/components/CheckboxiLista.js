import React, { Component } from 'react'
import Checkbox from './Checkbox'

class CheckboxiLista extends Component {

    componentWillMount = () => {
        this.selectedCheckboxes = new Set()
      }
    
    toggleCheckbox = (label) => {
      if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label)
      } else {
          this.selectedCheckboxes.add(label)
//          console.log(this.selectedCheckboxes)
      }
    }
    
    luoCheckboxi = (label) => (
      <Checkbox
        label={label}
        key={label}
        handleCheckboxChange={this.toggleCheckbox}
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