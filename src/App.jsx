import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/home' element= {<Home/>} />
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
