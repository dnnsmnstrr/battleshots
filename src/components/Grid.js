import React, {useState} from 'react'
import GridLayout from 'react-grid-layout'

import useWindowDimensions from '../hooks/useWindowDimensions'
import {useRadar} from '../hooks/useRadar'

import Cell from './Cell'
import Label from './Label'


const Grid = (props) => {
  const { height, width } = useWindowDimensions();
  const maxWidth = (height < width ? height - 100 : width - 50) 
  const {cells = [], size, cycleCellStatus, updating} = useRadar()
  const [highlight, setHighlight] = useState({x: null, y: null})
  const updateHighlight = (value, numeric) => {
    setHighlight({...highlight, ...(numeric ? {y: highlight.y !== value ? value : null} : {x: highlight.x !== value ? value : null})})
    console.log('highlight', highlight)
  }
  const buildGrid = (cells = [], size = 0) => {
    const totalSize = size + 1
    const grid = []
    for (var x = 0; x < totalSize; x++) {
      for (var y = 0; y < totalSize; y++) {
        if (x === 0 || y === 0) {
          grid.push({ cellType: 'label', value: x || y, x, y, onClick: updateHighlight})
        } else {
          const index = (x-1)*size + y-1
          const isHighlighted = highlight.x === x || highlight.y === y
          grid.push({ cellType: 'water', value: cells[index], x, y, isHighlighted, onClick: (e) => cycleCellStatus(index, e.type === 'contextmenu') })
        }
      }
    }
    return grid
  }

  const grid = buildGrid(cells, size)

  if (updating) return
  const layout = grid.map(({x,y}, i) => ({i, x, y, w: 1, h: 1, static: true}))
  return (
    <GridLayout
      className="layout"
      cols={size + 1}
      rowHeight={maxWidth / (size + 1)}
      maxRow={size + 1}
      layout={layout}
      width={maxWidth}
      margin={[0,5]}
    >
      {grid.map(({value, cellType, x, y, onClick, isHighlighted}, idx) => {
        return <div className='cellContainer' key={idx} data-grid={{x, y, w: 1, h: 1, static: true}}>
          {cellType === 'label' ? <Label index={value} numeric={!x} onClick={onClick} isHighlighted={isHighlighted} /> : <Cell status={value} onClick={onClick} isHighlighted={isHighlighted}/>}
        </div>;
      })}
    </GridLayout>
  )
}

export default Grid
