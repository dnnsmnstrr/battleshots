import React from 'react'
import GridLayout, { Responsive } from 'react-grid-layout'

import useWindowDimensions from '../hooks/useWindowDimensions'
import {useRadar} from '../hooks/useRadar'

import Cell from './Cell'
import Label from './Label'

const buildGrid = (cells = [], size = 0) => {
  const totalSize = size + 1
  const grid = []
  for (var x = 0; x < totalSize; x++) {
    for (var y = 0; y < totalSize; y++) {
      if (x === 0 || y === 0) {
        grid.push({ cellType: 'label', value: x || y, x, y})
      } else {
        const index = (x-1)*size + y-1
        grid.push({ cellType: 'water', value: cells[index], index, x, y })
      }
    }
  }
  return grid
}

const Grid = (props) => {
  const { height, width } = useWindowDimensions();
  const maxWidth = (height < width ? height : width) - 30
  const {cells = [], size, cycleCellStatus, updating} = useRadar()
  const grid = buildGrid(cells, size)

  if (updating) return
  const layout = grid.map(({x,y}, i) => ({i, x, y, w: 1, h: 1, static: true}))
  //{lg: size + 1, md: size + 1, sm: size + 1, xs: size + 1, xxs: size + 1}
  return (
    <GridLayout
      className="layout"
      cols={size + 1}
      rowHeight={maxWidth / (size + 1)}
      maxRow={size + 1}
      layout={layout}
      width={maxWidth}
      margin={[2,2]}
    >
      {grid.map(({value, cellType, x, y, index}, idx) => {
        console.log('idx', idx)
        return <div className='cellContainer' key={idx} data-grid={{x, y, w: 1, h: 1, static: true}}>
          {cellType === 'label' ? <Label index={value} numeric={!x} /> : <Cell status={value} onClick={(e) => cycleCellStatus(index, e.type === 'contextmenu')}/>}
        </div>;
      })}
    </GridLayout>
  )
}

export default Grid
