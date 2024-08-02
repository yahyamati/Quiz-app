import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Add.css';

const Add = () => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['JavaScript', 'Node.js', 'React', 'CSS', 'HTML']; // Define categories here

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      questionText,
      answerText,
      category,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/quiz/add', quizData);
      if (response.data.success) {
        toast.success(response.data.message);
        setQuestionText('');
        setAnswerText('');
        setCategory('');
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
          <input
            type="text"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
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
