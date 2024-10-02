import React, { useState } from 'react';
import axios from 'axios';
import './CssImage.css';
import uploadArea from '../../assets/upload_area.png';

const CssImage = ({url}) => {
  const [name, setImageName] = useState('');
  const [image, setImage] = useState(null);

  // Handle category name change
  const handleCategoryChange = (e) => {
    setImageName(e.target.value);
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

    if (!name || !image) {
      alert('Please provide a Image name and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const response = await axios.post(`https://quiz-app-backend-7w4o.onrender.com/api/CssBattle/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      setImageName('');
      setImage(null);
    } catch (error) {
      console.error('Error adding Image :', error);
      alert('There was an error adding the Image.');
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
      <h1>Add New Image</h1>
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
          <label htmlFor="ImageName">Targeted Image Name:</label>
          <input
            type="text"
            id="ImageName"
            value={name}
            onChange={handleCategoryChange}
            required
          />
        </div>
        <button type="submit">Add Image</button>
      </form>
    </div>
  );
};

export default CssImage;
