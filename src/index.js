import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as atatus from 'atatus-spa'
atatus.config('772027a976994112a3d3fb778b96ba82').install()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
// atatus.notify(new Error('Test Atatus Setup'))
