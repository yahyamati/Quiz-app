import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
const Quizzes = () => {
    const { category } = useParams();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/quiz/listFil?category=${category}`);
                setQuizzes(response.data.data);
            } catch (error) {
                console.error('There was an error fetching the quizzes!', error);
            }
        };

        fetchQuizzes();
    }, [category]);
    return ( 
        <div>
        <h1>Quizzes for {category}</h1>
        <div>
            {quizzes.map(quiz => (
                <div key={quiz._id}>
                    <h2>{quiz.question.text}</h2>
                    <p>{quiz.question.answer.text}</p>
                </div>
            ))}
        </div>
    </div> );
}
 
export default Quizzes;