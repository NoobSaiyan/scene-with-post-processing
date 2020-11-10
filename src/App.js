import React from 'react'
import Scene from './components/scene.component'
import Info from './components/info.component'
import './App.css'

export default function App() {
  return (
    <div className='container'>
      <div className='scene'>
        <Scene />
      </div>
      <div className='info'>
        <Info />
      </div>
    </div>
  )
}
