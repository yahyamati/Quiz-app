import ProgressBar from './ProgressBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
 const Block = ({url,category,imgsrc,navigate }) => {

const [totalQuestions, setTotalQuestions] = useState('');
const [currentIndex, setCurrentIndex] = useState(0);
const [quizzes, setQuizzes] = useState([]);
useEffect(() => {
  const storedCurrentIndex = localStorage.getItem(`${category}_currentIndex`);
  setCurrentIndex(storedCurrentIndex);
})

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

useEffect(() => {
  if (quizzes.length > 0) {
    console.log('Number of questions:', quizzes.length);
    setTotalQuestions(quizzes.length)
  }
}, [category,currentIndex,quizzes.length]);

const progressPercentage = (currentIndex / totalQuestions) * 100;
if (currentIndex === "") {
    currentIndex==="0";
}
    return ( 
    <>
    <div 
    onClick={() => {
        console.log(category);
        console.log(imgsrc);
        navigate(`/category/${category}`);
    }}
    className="flex flex-col gap-2 items-center justify-center bg-slate-100 px-16 p-4 rounded-3xl hover:scale-110 cursor-pointer hover:bg-slate-200 transition-transform ease-in-out w-80">
        <img src={`${imgsrc}`} alt="category logo" className='w-16 h-16' />
        <p className=" uppercase font-semibold">{category}</p>
        <ProgressBar progressPercentage={progressPercentage} totalQuestions={totalQuestions} currentIndex={currentIndex} home={true}/>
    </div>
    </> );
}

export default Block;