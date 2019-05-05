import React from "react"

const Ilmoitus = ({ viesti }) => {
  if (viesti.tyyppi === null) {
    return null
  } else if (viesti.tyyppi === "virhe") {
    return <div className="virhe">{viesti.viesti}</div>
  } else if (viesti.tyyppi === "onnistuminen") {
    return <div className="onnistuminen">{viesti.viesti}</div>
  }
}

export default Ilmoitus
