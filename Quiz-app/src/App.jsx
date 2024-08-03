import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Quizzes from './Components/Quizzes'
import Navbar from './Components/Navbar'
function App() {

  return (
    <>
      <Router>
      <Navbar />
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
