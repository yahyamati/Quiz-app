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
import ListArticle from './pages/ListArticle/ListArticle'
import CategoryArticle from './pages/AddCategoryArticle/CategoryArticle'
import ListCategoryArticle from './pages/ListCategoryArticle/ListCategoryArticle'
import CssImage from './pages/AddCssBattle/CssImage'
import ListCssImages from './pages/ListCssImages/ListCssImages'

function App() {
  const url = "https://quiz-app-backend-rdot.onrender.com"; // Adjust this to your backend URL
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
             <Route path="/ListArticle" element={<ListArticle url={url} />} />
             <Route path="/CategoryArticle" element={<CategoryArticle url={url} />} />
             <Route path="/listCategoryArticle" element={<ListCategoryArticle url={url} />} />
             <Route path="/addCssBattle" element={<CssImage url={url} />} />
             <Route path="/listCssBattle" element={<ListCssImages url={url} />} />
          </Routes>
        </div>
      </div>
  )
}

export default App
