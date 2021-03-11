import React from 'react'
import './App.css';
import 'react-grid-layout/css/styles.css'

import {RadarProvider} from './hooks/useRadar'
import Grid from './components/Grid'
import SizeInput from './components/SizeInput'

function App() {
  document.addEventListener('contextmenu', function(event){
    event.preventDefault();
  })

  return (
    <RadarProvider>
      <div className="App" >
        <Grid />
        <SizeInput />
      </div>
    </RadarProvider>
  );
}

export default App;
