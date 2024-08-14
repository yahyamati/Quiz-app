import React, { useEffect, useState } from 'react';
import './ListCategoryArticle.css';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';  // Importing the X icon from react-icons

const ListCategoryArticle = ({ url }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`https://quiz-app-backend-rdot.onrender.com/api/articles/listCategoryArticle`);
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('There was an error fetching the categories!', error);
      }
    };

    fetchCategories();
  }, [url]);
  

  // Function to handle the removal of a category
  const handleRemove = async (id) => {
    try {
      await axios.post(`${url}/api/articles/removeCategoryArticle`, { id });
      setCategories(categories.filter(category => category._id !== id));  
    } catch (error) {
      console.error("There was an error removing the category!", error);
    }
  };

  return (
    <div className="category-list">
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="category-item">
             <img src={category.image} alt={category.category} className="category-image" />
              <div className="category-info">
                <p><strong></strong> {category.CategoryArticle}</p>
              </div>
              <button className="remove-btn2" onClick={() => handleRemove(category._id)}>
                <FaTimes /> {/* X icon */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='no-found'>No categories found</p>
      )}
    </div>
  );
};

export default ListCategoryArticle;
