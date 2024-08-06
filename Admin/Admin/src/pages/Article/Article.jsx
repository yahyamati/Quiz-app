import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Article.css';
import uploadArea from '../../assets/upload_area.png';

const Article = () => {
    const [question, setQuestion] = useState('');
    const [text1, setText1] = useState('');
    const [image, setImage] = useState(null);
    const [text2, setText2] = useState('');
    const [liText, setLiText] = useState(['']);
    const [text3, setText3] = useState('');
    const [category1, setCategory1] = useState('');
    const [category2, setCategory2] = useState('');
    const [apiCategories, setApiCategories] = useState([]); // Categories from API

    const hardcodedCategories = ['beginners', 'intermediate', 'advanced'];

    useEffect(() => {
        // Fetch categories on component mount
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/articles/listCategoryArticle');
                if (response.data.success) {
                    setApiCategories(response.data.data); // Set categories from API response
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error('There was an error fetching the categories!', error);
                toast.error('There was an error fetching the categories!');
            }
        };

        fetchCategories();
    }, []);

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
        formData.append('question', question); // Ensure field names match
        formData.append('text1', text1);
        formData.append('image', image);
        formData.append('text2', text2);
        formData.append('liText', JSON.stringify(liText));
        formData.append('text3', text3);
        formData.append('category1', category1); // Add first category
        formData.append('category2', category2); // Add second category

        try {
            const response = await axios.post('http://localhost:4000/api/articles/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setQuestion('');
                setText1('');
                setImage(null);
                setText2('');
                setLiText(['']);
                setText3('');
                setCategory1('');
                setCategory2('');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('There was an error adding the article!', error);
            toast.error('There was an error adding the article!');
        }
    };

    return (
        <div className="article-form">
            <h2>Add Article</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Text1:</label>
                    <textarea
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
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
                    />
                </div>
                <div className="form-group">
                    <label>Text2:</label>
                    <textarea
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>List Items (liText):</label>
                    {liText.map((item, index) => (
                        <div key={index} className="li-text-group">
                            <textarea
                                value={item}
                                onChange={(e) => handleLiTextChange(index, e.target.value)}
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
                    />
                </div>
                <div className="form-group">
                    <label>Category 1 (Hardcoded):</label>
                    <select
                        value={category1}
                        onChange={(e) => setCategory1(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {hardcodedCategories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Category 2 (Fetched from API):</label>
                    <select
                        value={category2}
                        onChange={(e) => setCategory2(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {apiCategories.map((cat) => (
                            <option key={cat._id} value={cat.CategoryArticle}>
                                {cat.CategoryArticle}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Add Article</button>
            </form>
        </div>
    );
};

export default Article;
