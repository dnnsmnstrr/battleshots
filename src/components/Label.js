import React from 'react'

const toChars = n => `${n >= 26 ? toChars(Math.floor(n / 26) - 1) : ''}${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 26]}`;

const Label = ({index, numeric = false}, onClick = () => {}) => {
  let value = index
  if (!numeric) {
    value = toChars(index - 1)
  }
  return (
    <div className='Label' onClick={onClick}>{value ? value : ''}</div>
  )
}

export default Label
