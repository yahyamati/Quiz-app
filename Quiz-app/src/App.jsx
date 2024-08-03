import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Quizzes from './Components/Quizzes'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Quizzes />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
