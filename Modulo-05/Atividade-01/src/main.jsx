import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import Player from './Player.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Player songName={'Before I forget'}
      album={'All Hope is Gone'}
      artist={'Slipknot'}
      cover={"src/assets/img/cover.jpg"} />

    <Player songName={'AmEN!'}
      album={'Single'}
      artist={'Bring me the horizon'}
      cover={"src/assets/img/cover1.jpg"} />
  </React.StrictMode>,
)
