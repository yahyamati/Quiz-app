import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uploadArea from '../../assets/upload_area.png';
import './CategoryArticle.css'; // Make sure to create this CSS file for styling

const AddCategoryArticle = () => {
  const [categoryArticle, setCategoryArticle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleCategoryArticleChange = (e) => {
    setCategoryArticle(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryArticle || !image || !description) {
      setMessage('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('CategoryArticle', categoryArticle);
    formData.append('image', image);
    formData.append('Description', description);

    try {
      const response = await axios.post('https://quiz-app-backend-rdot.onrender.com/api/articles/addCategoryArticle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setCategoryArticle('');
      setImage(null);
      setDescription('');
    } catch (error) {
      setMessage('Error adding category article');
      console.error('There was an error!', error);
    }
  };

  // Create an object URL for the image preview
  const imagePreviewUrl = image ? URL.createObjectURL(image) : uploadArea;

  // Cleanup object URL when component unmounts
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="add-category-article">
      <h1>Add Category Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={imagePreviewUrl}
              alt="Upload Area"
              className="image-preview"
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
          <label htmlFor="categoryArticle">Article Name:</label>
          <input
            type="text"
            id="categoryArticle"
            value={categoryArticle}
            onChange={handleCategoryArticleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit">Add Category Article</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddCategoryArticle;
