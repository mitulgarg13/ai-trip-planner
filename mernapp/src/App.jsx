import React from 'react'
import './App.css'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { Outlet, useLocation } from 'react-router-dom'
import Hero from './components/custom/Hero'

function App() {
  const location = useLocation()

  return (
    <>
      <Header />
      <Toaster />
      
      {/* Conditionally render Hero only on homepage */}
      {location.pathname === '/' && <Hero />}

      {/* Renders child route components like CreateTrip, MyTrips, etc. */}
      <Outlet />
    </>
  )
}

export default App
