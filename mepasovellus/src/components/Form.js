import React from 'react'

const Form = ({ onSubmit, handleChange, value, aihe, otsikko }) => {
  return (
    <div>
      <h2>{otsikko}</h2>

      <form onSubmit={onSubmit}>
        <textarea
          value={value}
          name={aihe}
          onChange={handleChange}
          cols="50"
          rows="5"
        />
      </form>
    </div>
  )
}

export default Form