import React from "react"

const Logout = ({ user, outLogger }) => {
  if (user === null) {
    return null
  }
  return (
    <button className="logout" onClick={outLogger}>
      Kirjaudu ulos
    </button>
  )
}

export default Logout
