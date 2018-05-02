import React from 'react';

const DropdownValikko = ({otsikko, listaaja, rajoittaja}) => {
    
    const toggleri = () => document.getElementById(otsikko).classList.toggle("show")

    return (
    <div className="dropdown">
            <button onClick={toggleri} className="dropbtn">{otsikko}</button>
            <div id={otsikko} className="dropdown-content">
              {rajoittaja}
              {listaaja} 
            </div>
    </div>
    )
}

export default DropdownValikko