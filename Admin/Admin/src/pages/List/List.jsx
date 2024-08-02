import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';  // Importing the X icon from react-icons

const List = ({ url }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${url}/api/quiz/list`);
        setQuizzes(response.data.data); // Adjust this based on your response structure
      } catch (error) {
        console.error("There was an error fetching the quizzes!", error);
      }
    };

    fetchQuizzes();
  }, [url]);

  // Function to handle the removal of a quiz item
  const handleRemove = async (id) => {
    try {
      await axios.post(`${url}/api/quiz/remove`, { id });
      setQuizzes(quizzes.filter(quiz => quiz._id !== id));  // Update state to remove the deleted food item
    } catch (error) {
      console.error("There was an error removing the food item!", error);
    }
  };


  return (
    <div className="quiz-list">
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="quiz-item">
              <div className="quiz-info">
                <p><strong>Question:</strong> {quiz.question.text}</p>
                <p><strong>Category:</strong> {quiz.category}</p>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(quiz._id)}>
                <FaTimes /> {/* X icon */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='no-found'>No quizzes found</p>
      )}
    </div>
  );
};

export default List;
