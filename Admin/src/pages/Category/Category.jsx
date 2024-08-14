import React, { useState } from 'react';
import axios from 'axios';
import './Category.css';
import uploadArea from '../../assets/upload_area.png';

const Category = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);

  // Handle category name change
  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !image) {
      alert('Please provide a category name and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('category', categoryName);
    formData.append('image', image);

    try {
      const response = await axios.post('https://quiz-app-backend-rdot.onrender.com/api/quiz/addCategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      setCategoryName('');
      setImage(null);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('There was an error adding the category.');
    }
  };

  // Create an object URL for the image preview
  const imagePreviewUrl = image ? URL.createObjectURL(image) : uploadArea;

  // Cleanup object URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="category-form">
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={imagePreviewUrl}
              alt="Upload Area"
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            hidden
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleCategoryChange}
            required
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default Category;
