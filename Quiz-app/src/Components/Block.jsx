import ProgressBar from './ProgressBar';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Block = ({ url, category, imgsrc, navigate }) => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const storedCurrentIndex = localStorage.getItem(`${category}_currentIndex`);
    setCurrentIndex(storedCurrentIndex || 0); // Default to 0 if no value is found
  }, [category]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${url}/api/quiz/listCategory`);
        // Find the category data from the response
        const categoryData = response.data.data.find(cat => cat.category === category);
        if (categoryData) {
          setQuizzes(categoryData.quizzes || []);
        }
      } catch (error) {
        console.error('There was an error fetching the quizzes!', error);
      }
    };

    fetchQuizzes();
  }, [category, url]);

  useEffect(() => {
    if (quizzes.length > 0) {
      console.log('Number of questions:', quizzes.length);
      setTotalQuestions(quizzes.length);
    }
  }, [quizzes]);

  const progressPercentage = (totalQuestions > 0) ? (currentIndex / totalQuestions) * 100 : 0;

  // Cloudinary URL construction
  const imageUrl = imgsrc ? `${imgsrc}` : '';

  return (
    <div
      onClick={() => {
        console.log(category);
        console.log(imageUrl);
        navigate(`/category/${category}`);
      }}
      className="flex flex-col gap-2 items-center justify-center bg-slate-100 px-16 p-4 rounded-3xl hover:scale-110 cursor-pointer hover:bg-slate-200 transition-transform ease-in-out w-80"
    >
      <img src={imageUrl} alt={category} className="w-16 h-16" />
      <p className="uppercase font-semibold">{category}</p>
      <ProgressBar progressPercentage={progressPercentage} totalQuestions={totalQuestions} currentIndex={currentIndex} home={true} />
    </div>
  );
};

export default Block;
