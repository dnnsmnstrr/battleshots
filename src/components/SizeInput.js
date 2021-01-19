import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useRadar} from '../hooks/useRadar'

const SizeInput = (props) => {
  const {size, updateSize, resetCells} = useRadar()
  const [internalSize, setInternalSize] = useState(size)

  const handleChange = (event) => {
    setInternalSize(event.target.value)
  }

  const handleSubmit = (event) => {
    updateSize(internalSize)
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>
          Size:
          <input type="number" value={internalSize} onChange={handleChange} />
          <input type="submit" value="Submit" />
          <button type='button' onClick={resetCells}>Reset</button>
        </label>
      </form>
  )
}

export default SizeInput
