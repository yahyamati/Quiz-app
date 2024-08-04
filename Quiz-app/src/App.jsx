import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Quizzes from './Components/Quizzes';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Quizzes />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
