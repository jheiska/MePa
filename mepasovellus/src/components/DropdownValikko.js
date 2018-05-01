import React from 'react';

const DropdownValikko = ({otsikko, toggleri, listaaja}) => {
    return (
    <div className="dropdown">
            <button onClick={toggleri} className="dropbtn">{otsikko}</button>
            <div id={otsikko} className="dropdown-content">
              {listaaja}
            </div>
    </div>
    )
}

export default DropdownValikko