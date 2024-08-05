import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Add.css';

const Add = () => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [example, setExample] = useState('');
  const [explainExample, setExplainExample] = useState(''); 
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/quiz/listCategory');
        if (response.data.success) {
          setCategories(response.data.data); 
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('There was an error fetching the categories!', error);
        alert('There was an error fetching the categories!');
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      questionText,
      answerText,
      category: selectedCategoryName, // Save category name instead of ID
      example,
      explainExample 
    };

    try {
      const response = await axios.post('http://localhost:4000/api/quiz/add', quizData);
      if (response.data.success) {
        toast.success(response.data.message);
        setQuestionText('');
        setAnswerText('');
        setSelectedCategoryName('');
        setExample('');
        setExplainExample(''); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('There was an error adding the quiz!', error);
      alert('There was an error adding the quiz!');
    }
  };

  return (
    <div>
      <h1>Add Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Answer:</label>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
            rows="4"
          />
        </div>
        <div>
          <label>Example (optional):</label>
          <textarea
            value={example}
            onChange={(e) => setExample(e.target.value)}
            rows="4"
          />
        </div>
        <div>
          <label>Explain Example (optional):</label>
          <textarea
            value={explainExample}
            onChange={(e) => setExplainExample(e.target.value)} 
            rows="4"
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={selectedCategoryName} onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Quiz</button>
      </form>
    </div>
  );
};

export default Add;
