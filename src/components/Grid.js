import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import GridLayout from 'react-grid-layout'

import useWindowDimensions from '../hooks/useWindowDimensions'
import {useRadar} from '../hooks/useRadar'

import Cell from './Cell'

const Grid = (props) => {
  const { height, width } = useWindowDimensions();
  const maxWidth = (height < width ? height : width) - 30

  const {size, cells = [], resetCells, cycleCellStatus} = useRadar()

  const children = React.useMemo(() => {
    return cells.map((val, idx) => {
      return <div key={idx} data-grid={{x: idx % size, y: Math.floor(idx / size), w: 1, h: 1, static: true}}><Cell status={val} onClick={() => cycleCellStatus(idx)}/></div>;
    });
  }, [size, cells]);

  return (
    <GridLayout className="layout" cols={size} rowHeight={maxWidth / size} width={maxWidth} margin={[2,2]}>
      {children}
    </GridLayout>
  )
}

export default Grid
