import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as atatus from 'atatus-spa'
atatus.config('bd3637eb11534fb6818085221cf2ba9e').install()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
// atatus.notify(new Error('Test Atatus Setup'))
