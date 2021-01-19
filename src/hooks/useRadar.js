import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'

export const RadarContext = createContext({})
export const useRadar = () => useContext(RadarContext)


export const RadarProvider = ({ children }) => {
  const DEFAULT_GAMESIZE = 8
  const MAX_SIZE = 12
  const MIN_SIZE = 2
  const [size, setSize] = useState(DEFAULT_GAMESIZE)
  const [cells, setCells] = useState()

  const initalizeCells = useCallback(() => {
    setCells([])
    const defaultCells = new Array(size * size).fill('water')
    setCells(defaultCells)
  }, [size, setCells])

  useEffect(() => {
    if (size > 0) {
      initalizeCells()
    }
  }, [size, initalizeCells])

  const updateSize = (newSize) => {
    console.log('newSize', newSize)
    if (newSize > MAX_SIZE) {
      setSize(MAX_SIZE)
    } else if (newSize < MIN_SIZE) {
      setSize(MIN_SIZE)
    } else {
      setSize(Number(newSize))
    }
  }

  const resetCells = useCallback(() => {
    initalizeCells()
  }, [initalizeCells])

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
