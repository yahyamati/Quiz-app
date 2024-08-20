import React, { useEffect, useState } from 'react';
import './ListCssImages.css';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';  // Importing the X icon from react-icons

const ListCssImages = ({ url }) => {
  const [Images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [Cssimages, setCssImages] = useState([]);
  useEffect(() => {
    const fetchCssImages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/CssBattle/getall');
        setCssImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CssImages:', error);
      }
    };
    fetchCssImages();
  }, []);
  

  // Function to handle the removal of a 
  const handleRemove = async (id) => {
    try {
      await axios.post(`http://localhost:4000/api/CssBattle/remove`, { id });
      setImages(Images.filter(image => image._id !== id));  
    } catch (error) {
      console.error("There was an error removing the image!", error);
    }
  };

  return (
    <div className="category-list">
      {Cssimages.length > 0 ? (
        <ul>
          {Cssimages.map((image) => (
            <li key={image._id} className="category-item">
              <img src={image.image} alt={image.image} className="category-image " />
              <div className="category-info">
                <p><strong></strong> {image.name}</p>
              </div>
              <button className="remove-btn2" onClick={() => handleRemove(image._id)}>
                <FaTimes /> {/* X icon */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='no-found'>No Images found</p>
      )}
    </div>
  );
};

export default ListCssImages;
