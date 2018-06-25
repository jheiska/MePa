import React, { Component } from 'react'
import Checkbox from './Checkbox'

class CheckboxiLista extends Component {
    
    luoCheckboxi = (label) => (
      <Checkbox
        label={label}
        key={label}
        handleCheckboxChange={this.props.onChange}
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