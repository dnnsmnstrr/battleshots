import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'

export const RadarContext = createContext({})
export const useRadar = () => useContext(RadarContext)

export const RadarProvider = ({ children }) => {
  const DEFAULT_GAMESIZE = 3
  const MAX_SIZE = 12
  const MIN_SIZE = 2
  const [size, setSize] = useState(DEFAULT_GAMESIZE)
  const [cells, setCells] = useState()
  const [updating, setUpdating] = useState(false)

  const initalizeCells = useCallback(() => {
    setUpdating(true)
    setCells([])
    const defaultCells = new Array(size * size).fill('water')
    console.log('defaultCells', defaultCells)
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

  const cycleCellStatus = (index, isHit = false) => {
    const newCells = [...cells]
    const currentCellStatus = newCells[index]

    switch (currentCellStatus) {
      case 'hit':
        newCells[index] = isHit ? 'water' : 'miss'
        break
      case 'miss':
        newCells[index] = 'hit'
        break
      default:
        newCells[index] = isHit ? 'hit' : 'miss'
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
