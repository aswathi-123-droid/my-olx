import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)
  console.log("App component is rendered")

  return (
    <div className='-mt-8'>
      <Navbar/>
     <Outlet></Outlet>
    </div>
  )
}

export default App
