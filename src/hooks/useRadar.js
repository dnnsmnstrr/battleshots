import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'

export const RadarContext = createContext({})
export const useRadar = () => useContext(RadarContext)

export const RadarProvider = ({ children }) => {
  const DEFAULT_GAMESIZE = 6
  const MAX_SIZE = 12
  const MIN_SIZE = 2
  const [size, setSize] = useState(DEFAULT_GAMESIZE)
  const [cells, setCells] = useState()
  const [updating, setUpdating] = useState(false)

  const initalizeCells = useCallback(() => {
    setUpdating(true)
    setCells([])
    const defaultCells = new Array(size * size).fill('water')
    setCells(defaultCells)
    setUpdating(false)
  }, [size, setCells])

  useEffect(() => {
    if (size > 0) {
      initalizeCells()
    }
  }, [size, initalizeCells])

  const updateSize = (newSize) => {
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

  const cycleCellStatus = (index, secondary = false) => {
    const newCells = [...cells]
    const currentCellStatus = newCells[index]

    switch (currentCellStatus) {
      case 'hit':
        newCells[index] = secondary ? 'water' : 'miss'
        break
      case 'miss':
        newCells[index] = secondary ? 'water' : 'hit'
        break
      default:
        newCells[index] = secondary ? 'hit' : 'miss'
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
        updating,
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
