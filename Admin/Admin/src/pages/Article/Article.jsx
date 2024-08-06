import React, { useState } from 'react';
import axios from 'axios';
import './Article.css';
import uploadArea from '../../assets/upload_area.png';

const Article = () => {
    const [text1, setText1] = useState('');
    const [image, setImage] = useState(null);
    const [text2, setText2] = useState('');
    const [liText, setLiText] = useState(['']); // Initialize with an empty string for the first item
    const [text3, setText3] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');


    const categories = ['beginners', 'intermediate', 'advanced'];

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleLiTextChange = (index, value) => {
        const newLiText = [...liText];
        newLiText[index] = value;
        setLiText(newLiText);
    };

    const handleAddLiText = () => {
        setLiText([...liText, '']);
    };

    const handleRemoveLiText = (index) => {
        const newLiText = liText.filter((_, i) => i !== index);
        setLiText(newLiText);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text1', text1);
        formData.append('image', image);
        formData.append('text2', text2);
        formData.append('liText', JSON.stringify(liText)); 
        formData.append('text3', text3);
        formData.append('category', category);

        try {
            const response = await axios.post('http://localhost:4000/api/articles/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                setText1('');
                setImage(null);
                setText2('');
                setLiText(['']); 
                setText3('');
                setCategory('');
                setMessage('Article added successfully');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('There was an error adding the article!', error);
            setMessage('There was an error adding the article!');
        }
    };

    return (
        <div className="article-form">
            <h2>Add Article</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Text1:</label>
                    <textarea
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
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
                <div className="form-group">
                    <label>Text2:</label>
                    <textarea
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>List Items (liText):</label>
                    {liText.map((item, index) => (
                        <div key={index} className="li-text-group">
                            <textarea
                                value={item}
                                onChange={(e) => handleLiTextChange(index, e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => handleRemoveLiText(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddLiText}>Add List Item</button>
                </div>
                <div className="form-group">
                    <label>Text3:</label>
                    <textarea
                        value={text3}
                        onChange={(e) => setText3(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                        <label>Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                <button type="submit">Add Article</button>
            </form>
        </div>
    );
};

export default Article;
