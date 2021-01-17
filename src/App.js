import React, {useState, useEffect} from 'react'
import './App.css';
import 'react-grid-layout/css/styles.css'

import Grid from './Grid'
import SizeInput from './SizeInput'

function App() {
  const [size, setSize] = useState(6)
  useEffect(() => console.log('size', size), [size])
  const updateSize = (newSize) => {
    console.log('newSize', newSize)
    if (newSize > 8) {
      setSize(8)
    } else if (newSize < 2) {
      setSize(2)
    } else {
      setSize(newSize)
    }
  }
  return (
    <div className="App" >
      <Grid size={size}/>
      <SizeInput size={size} updateSize={updateSize}/>
    </div>
  );
}

export default App;
