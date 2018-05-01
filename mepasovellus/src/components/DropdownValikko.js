import React from 'react';

const Valikko = ({otsikko, lista}) => {
    <div className="dropdown">
          <button onClick={() => avaaToimitukset()} className="dropbtn">{otsikko}</button>
          <div id="toimitusten_valinta" className="dropdown-content">
            {toimitukset()}
          </div>
    </div>
}