import React, { useEffect, useState } from 'react';
import './ListArticle.css';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';  // Importing the X icon from react-icons

const ListArticle = ({ url }) => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/api/articles/get`);
        setArticles(response.data.data); // Adjust this based on your response structure
        console.log("Fetched all articles:", response.data.data); // Log fetched articles
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
      setArticles(articles.filter(article => article._id !== id));
    } catch (error) {
      console.error("There was an error removing the article!", error);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategoryName(selectedCategory);

    console.log("Selected category:", selectedCategory);

    if (selectedCategory) {
      try {
        // Correctly pass the category2 parameter
        const response = await axios.get(`${url}/api/articles/listFilArticle`, { params: {  category2 : selectedCategory } });

        if (response.data.success) {
          setArticles(response.data.data);
          console.log("Fetched filtered articles:", response.data.data); // Log filtered articles
        } else {
          console.error(response.data.message);
          setArticles([]);  // Clear articles if there's an error
        }
      } catch (error) {
        console.error('There was an error fetching the filtered articles!', error);
        setArticles([]);  // Clear articles if there's an error
      }
    } else {
      // If no category is selected, fetch all articles
      try {
        const response = await axios.get(`${url}/api/articles/get`);
        setArticles(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the articles!", error);
      }
    }
  };

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/articles/listCategoryArticle`);
        if (response.data.success) {
          setCategories(response.data.data);
          console.log("Fetched categories:", response.data.data); // Log fetched categories
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('There was an error fetching the categories!', error);
      }
    };

    fetchCategories();
  }, [url]);

  return (
    <div className="article-list">
      <div>
        <label>Choose Category:</label>
        <select value={selectedCategoryName} onChange={handleCategoryChange} required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.CategoryArticle}>
              {cat.CategoryArticle}
            </option>
          ))}
        </select>
      </div>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article._id} className="article-item">
              <div className="article-info">
                <p><strong>Question:</strong> {article.Question}</p>
                <p><strong>Level Category:</strong> {article.category1}</p>
                <p><strong>Category:</strong> {article.category2}</p>
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
