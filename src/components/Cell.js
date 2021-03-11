import React from 'react'

const colors = {
  water: 'blue',
  hit: 'red',
  miss: 'grey'
}

const Cell = ({status, onClick, isHighlighted = false}) => {
  return (
    <div className='Cell' style={{backgroundColor: colors[status], border: isHighlighted ? '3px solid black' : '3px solid white'}} onClick={onClick} onContextMenu={onClick}></div>
  )
}

export default Cell
