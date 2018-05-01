import React from 'react'

const Form = ({ onSubmit, handleChange, value, aihe, otsikko }) => {
  return (
    <div>
      <h2>{otsikko}</h2>

      <form onSubmit={onSubmit}>
        <input
          value={value}
          name={aihe}
          onChange={handleChange}
        />
        <button>tallenna</button>
      </form>
    </div>
  )
}

export default Form