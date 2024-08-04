import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Loading from './Loading';

const Home = lazy(() => import('./Components/Home'));
const Quizzes = lazy(() => import('./Components/Quizzes'));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Quizzes />} />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
