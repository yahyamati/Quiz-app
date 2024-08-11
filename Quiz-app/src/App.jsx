import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Loading from './Loading';

const Home = lazy(() => import('./Components/Home'));
const Quizzes = lazy(() => import('./Components/Quizzes'));
const Articles = lazy(() => import('./Components/Articles'));
const Article = lazy(() => import('./Components/Article'));

function App() {
  const url = "https://quiz-app-backend-rdot.onrender.com"; // Adjust this to your backend URL
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path="/" element={<Home url={url}/>} />
              <Route path="/category/:category" element={<Quizzes url={url} />} />
              <Route path="/articles" element={<Articles url={url}/>} />
              <Route path="/articles/:category" element={<Article url={url}/>} />              
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
