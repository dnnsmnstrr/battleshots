import React from 'react'

const colors = {
  water: 'blue',
  hit: 'red',
  miss: 'grey'
}

const Cell = ({status, onClick}) => {
  const isHit = status === 'hit'

  return (
    <div className='Cell' style={{backgroundColor: colors[status]}} onClick={onClick}>{isHit ? "X" : ''}</div>
  )
}

export default Cell
