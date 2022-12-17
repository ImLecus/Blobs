import React from 'react'
import ReactDOM from 'react-dom/client'
import Sim from './components/simulation'
import Window from './components/window'
import "./main.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Window name="Simulation" content={<Sim />}></Window>
  </React.StrictMode>,
)
