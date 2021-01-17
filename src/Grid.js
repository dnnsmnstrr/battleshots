import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import GridLayout from 'react-grid-layout'
import useWindowDimensions from './hooks/useWindowDimensions'
const Cell = ({index, initialState = 'water'}) => {
  const [status, setStatus] = useState(initialState)
  const isWater = status === 'water'
  const colors = {
    water: 'blue',
    hit: 'red',
    miss: 'grey'
  }

  const cycleStatus = () => {
    console.log('status', status)
    switch (status) {
      case 'water':
        setStatus('hit')
        break
      case 'hit':
        setStatus('miss')
        break
      default:
        setStatus('water')
    }
  }
  return (
    <div className='Cell' style={{backgroundColor: colors[status]}} onClick={cycleStatus}>{status === 'hit' ? "X" : ''}</div>
  )
}

const Grid = ({size = 8}) => {
  const { height, width } = useWindowDimensions();
  const maxWidth = (height < width ? height : width) - 30
  const defaultCells = new Array(size * size).fill('water')
  const [field, setField] = useState(defaultCells)
  useEffect(() => {
    setField(defaultCells)
  }, [size])

  const children = React.useMemo(() => {
    return field.map((val, idx) => {
      return <div key={idx} index={idx} data-grid={{x: idx % size, y: Math.floor(idx / size), w: 1, h: 1, static: true}}><Cell index={idx}/></div>;
    });
  }, [size, field]);

  return (
    <GridLayout className="layout" cols={size} rowHeight={maxWidth / size} width={maxWidth} margin={[2,2]}>
      {children}
    </GridLayout>
  )
}

export default Grid
