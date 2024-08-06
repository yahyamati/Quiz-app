import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes , Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Category from './pages/Category/Category'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ListCategory from './pages/ListCategory/ListCategory'
import Article from './pages/Article/Article'


function App() {
  const url = "http://localhost:4000"; // Adjust this to your backend URL
  return (
      <div>   
        <ToastContainer />
        <Navbar />
        <div className="app-content">
          <Sidebar />
          <Routes>
             <Route path="/add" element={<Add url={url} />} />
             <Route path="/List" element={<List url={url} />} />
             <Route path="/Category" element={<Category url={url} />} />
             <Route path="/ListCategory" element={<ListCategory url={url} />} />
             <Route path="/addArticle" element={<Article url={url} />} />
          </Routes>
        </div>
      </div>
  )
}

export default App
