import React, { useEffect, useState } from 'react';
import './ListArticle.css';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';  // Importing the X icon from react-icons

const ListArticle = ({ url }) => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Hardcoded categories
  const categories = ['beginners', 'intermediate', 'advanced'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/api/articles/get`);
        setArticles(response.data.data); // Adjust this based on your response structure
      } catch (error) {
        console.error("There was an error fetching the articles!", error);
      }
    };

    fetchArticles();
  }, [url]);

  // Function to handle the removal of an article
  const handleRemove = async (id) => {
    try {
      await axios.post(`${url}/api/articles/remove`, { id });
      setArticles(articles.filter(article => article._id !== id));  // Corrected to use 'articles'
    } catch (error) {
      console.error("There was an error removing the article!", error);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      // Filter articles manually on the frontend based on the selected category
      setArticles((prevArticles) => 
        prevArticles.filter(article => article.category === category)
      );
    } else {
      // If no category is selected, fetch all articles
      const fetchAllArticles = async () => {
        try {
          const response = await axios.get(`${url}/api/articles/get`);
          setArticles(response.data.data);
        } catch (error) {
          console.error("There was an error fetching the articles!", error);
        }
      };
      fetchAllArticles();
    }
  };

  return (
    <div className="article-list">
      <div>
        <label>Choose Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange} required>
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article._id} className="article-item">
              <div className="article-info">
                <p><strong>Text1:</strong> {article.text1}</p>
                <p><strong>Category:</strong> {article.category}</p>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(article._id)}>
                <FaTimes /> {/* X icon */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='no-found'>No articles found</p>
      )}
    </div>
  );
};

export default ListArticle;
