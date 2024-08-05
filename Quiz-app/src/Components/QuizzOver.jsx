import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import Confetti from 'react-confetti';
const QuizOver = ({
    totalQuestions,
    passedCount,
    skippedCount,
    category
}) => {
  const { width, height } = useWindowSize();

  const clearCategoryLocalStorage = (category) => {
    localStorage.removeItem(`${category}_currentIndex`);
    localStorage.removeItem(`${category}_skippedCount`);
    localStorage.removeItem(`${category}_passedCount`);
    localStorage.removeItem(`${category}_actions`);
  };



    return (
        <div className="flex flex-col items-center justify-center h-80 mx-10">
            <Link
            onClick={() => clearCategoryLocalStorage(category)}
            to="/"
            className="mb-6 flex items-center gap-1 justify-center w-fit cursor-pointer text-gray-600 hover:underline underline-offset-2 "
          >
            <IoArrowBackOutline className="size-5" />
            <span className="font-semibold">Go back to Categories</span>
          </Link>
            <div className="p-8 bg-white rounded-lg shadow-lg text-center border">
                {
                    passedCount > totalQuestions / 2 ? (
                    <>
                    <Confetti width={width} height={height} />
                     <h1 className="text-4xl font-bold text-green-600 mb-4">Congratulations! you did good for {category} quizzes</h1>      
                    </>
                    
                    ) : (
                    <h1 className="text-4xl font-bold text-green-600 mb-4">It's Okay Try next Time</h1>
                                     )
                }
            
              <p className="font-semibold">Skipped: {skippedCount}</p>
              <p className="font-semibold">Passed: {passedCount}</p>
            </div>
          </div>
    );
}
 
export default QuizOver;


// useWindowSize.js
import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

