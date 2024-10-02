import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Loading from './Loading';
const Home = lazy(() => import('./Components/Home'));
const Quizzes = lazy(() => import('./Components/Quizzes'));
const Articles = lazy(() => import('./Components/Articles'));
const Article = lazy(() => import('./Components/Article'));
const NotFound = lazy(() => import('./NotFound'));
const CssBattle = lazy(() => import('./Components/cssbattle/CssBattle'));
const SlideCard = lazy(() => import('./Components/SlideCard'));

function App() {
  const url = "https://quiz-app-backend-7w4o.onrender.com"; // Adjust this to your backend URL

  // Ping backend periodically
  useEffect(() => {
    const pingBackend = () => {
      axios.get(`${url}/ping`)
        .then(response => console.log('Backend pinged'))
        .catch(error => console.error('Error pinging backend:', error));
    };

    const intervalId = setInterval(pingBackend, 3 * 60 * 1000); // Ping every 3 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [url]);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home url={url} />} />
              <Route path="/category/:category" element={<Quizzes url={url} />} />
              <Route path="/articles" element={<Articles url={url} />} />
              <Route path="/articles/:category" element={<Article url={url} />} />
              <Route path="/csschallenges" element={<SlideCard />} />
              <Route path="/cssBattle/:id" element={<CssBattle />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <FooterVisibilityHandler />
      </Router>
    </div>
  );
}

// Component to handle footer visibility
function FooterVisibilityHandler() {
  const location = useLocation(); // Get the current location
  const [cssBattle, setCssBattle] = useState(false);

  useEffect(() => {
    const pathName = location.pathname;
    if (pathName.split('/')[1] === 'cssBattle') {
      setCssBattle(true);
    } else {
      setCssBattle(false);
    }
  }, [location.pathname]);  // Re-run this effect when the location changes

  return !cssBattle && <Footer />;
}

export default App;
