import React, { useState } from 'react';
import axios from 'axios';
import uploadArea from '../../assets/upload_area.png';

const AddCategoryArticle = ({ url }) => {
  const [categoryArticle, setCategoryArticle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleCategoryArticleChange = (e) => {
    setCategoryArticle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('CategoryArticle', categoryArticle);
    formData.append('image', image);
    formData.append('Description', description);

    try {
      const response = await axios.post(`${url}/api/articles/addCategoryArticle`, formData, {
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

  return (
    <div>
      <h1>Add Category Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : uploadArea}
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
        <div>
          <label>Article Name:</label>
          <input
            type="text"
            value={categoryArticle}
            onChange={handleCategoryArticleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit">Add Category Article</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCategoryArticle;
