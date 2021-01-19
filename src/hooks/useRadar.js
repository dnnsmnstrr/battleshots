import React, { createContext, useState, useEffect, useContext } from 'react'

export const RadarContext = createContext({})
export const useRadar = () => useContext(RadarContext)


export const RadarProvider = ({ children }) => {
  const DEFAULT_GAMESIZE = 8
  const MAX_SIZE = 12
  const MIN_SIZE = 2
  const [size, setSize] = useState(DEFAULT_GAMESIZE)
  const defaultCells = new Array(size * size).fill('water')
  const [cells, setCells] = useState(defaultCells)

  const updateSize = (newSize) => {
    console.log('newSize', newSize)
    if (newSize > MAX_SIZE) {
      setSize(MAX_SIZE)
    } else if (newSize < MIN_SIZE) {
      setSize(MIN_SIZE)
    } else {
      setSize(newSize)
    }
  }

  const resetCells = (size) => {
    setCells(defaultCells)
  }

  useEffect(() => {
    resetCells(size)
  }, [size])

  const cycleCellStatus = (index) => {
    const newCells = [...cells]
    const currentCellStatus = newCells[index]

    switch (currentCellStatus) {
      case 'water':
        newCells[index] = 'hit'
        break
      case 'hit':
        newCells[index] = 'miss'
        break
      default:
        newCells[index] = 'water'
    }

    setCells(newCells)
  }

  const getCellStatus = (index) => {
      return cells[index]
  }

  return (
    <RadarContext.Provider
      value={{
        size,
        updateSize,
        cells,
        resetCells,
        getCellStatus,
        cycleCellStatus
      }}
    >
      {children}
    </RadarContext.Provider>
  )
}
