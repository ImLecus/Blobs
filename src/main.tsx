import React from 'react'
import ReactDOM from 'react-dom/client'
import Window from './components/window'
import './index.css'

var form = (
  <form>
    Initial blob number: <input type="number" min="0" max="255"/> <br />
    Food number: <input type="number" min="0" max="511"/>  <br />
    Generation time: <input type="number" min="0" max="511" defaultValue="15"/> seconds <br />
    <input type="submit" value="Start simulation" />
  </form>
);

var stats = (
  <>
    Generations: 1 <br />
    Blobs: 12
  </>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Window name="Options" content={form} />
    <Window name="Game" content={<div className="game"></div>}/>
    <Window name="Statistics" content={stats} />
  </React.StrictMode>
)
