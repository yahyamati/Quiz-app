import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import QuizOver from "./QuizzOver";
import ProgressBar from "./ProgressBar";
import CodeSnippet from "./CodeSnippet";

const Quizzes = () => {
    const { category } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [skippedCount, setSkippedCount] = useState(0);
    const [passedCount, setPassedCount] = useState(0);
    const [slide, setSlide] = useState('right');

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


    const handleNext = () => {
        setSkippedCount(skippedCount + 1);
        setCurrentIndex(currentIndex + 1);
        setRevealed(false);
        setSlide('left');
    };

    const handlePass = () => {
        setPassedCount(passedCount + 1);
        setCurrentIndex(currentIndex + 1);
        setRevealed(false);
        setSlide('left');
    };

    const handleReveal = () => {
        setRevealed(true);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setRevealed(false);
            setSlide('right');
        }
    };
    const handleReset = () => {
        setCurrentIndex(0);
        setRevealed(false);
        setSkippedCount(0);
        setPassedCount(0);
        setSlide('right');
    };

    const totalQuestions = quizzes.length;
    const progressPercentage = ((currentIndex ) / totalQuestions) * 100;
    if (currentIndex >= totalQuestions) {
        return (
            <QuizOver
                totalQuestions={totalQuestions}
                skippedCount={skippedCount}
                passedCount={passedCount}
            />
        );
    }

    const currentQuiz = quizzes[currentIndex];

    return (
      <div>
        <div className="table mx-auto mt-6">
          <Link
            to="/"
            className="flex items-center gap-1 justify-center w-fit cursor-pointer text-gray-600 hover:underline underline-offset-2 "
          >
            <IoArrowBackOutline className="size-5" />
            <span className="font-semibold">Go back to Categories</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl mx-auto table mt-10">
          Quizzes for {category}
        </h1>
        <p className="mx-auto font-semibold table p-6 md:text-xl text-gray-500 text-center">
          Test, rate and improve your {category} knowledge with these questions.
        </p>
        <div className="border p-4 my-4 rounded-xl shadow-lg mx-auto table md:w-5/12 w-11/12 mb-20">
            <ProgressBar progressPercentage={progressPercentage} skippedCount={skippedCount} passedCount={passedCount} totalQuestions={totalQuestions} currentIndex={currentIndex} />
          <h2
            className={`text-xl font-semibold mx-auto table ${
              revealed ? "my-6 slide-up" : "my-28 slide-down"
            } text-center ${!revealed && slide === "left" ? "slide-left" : "slide-right"}`}
          >
            {currentQuiz.question.text}
          </h2>
          <div className="flex justify-center">
            {!revealed ? (
              <button
                onClick={handleReveal}
                className=" slide-down font-semibold underline-offset-2 underline text-gray-600 hover:text-black transition ease-in-out duration-200"
              >
                Reveal Answer
              </button>
            ) : (
              <button
                onClick={() => setRevealed(false)}
                className="slide-up font-semibold underline-offset-2 underline text-gray-600 hover:text-black transition ease-in-out"
              >
                Hide Answer
              </button>
            )}
          </div>
          {revealed && (
            <div className="mt-4 slide-up">
              <div className="bg-slate-100 p-4 rounded-xl mb-6">
                <p className="text-gray-700">
                  {currentQuiz.question.answer.text}
                </p>
              </div>
              {currentQuiz.example && (
                <>
                <CodeSnippet
                  language={category.toString().toLowerCase()}
                  codeString={currentQuiz.example}
                />
                {
                    currentQuiz.explainExample && (
                        <div className="bg-slate-100 p-4 rounded-xl mt-6">
                        <p className="text-gray-700">{currentQuiz.explainExample}</p>
                        </div>)
                }
                </>
                

              )}
            </div>
          )}
          <div className="flex justify-center xs:justify-between mt-10 flex-wrap gap-4 sm:gap-0">
            <button
              onClick={handlePass}
              className="font-semibold underline-offset-2 underline text-green-500 hover:text-green-600 transition ease-in-out"
            >
              Know the Answer
            </button>
            <button
              onClick={handleNext}
              className="font-semibold underline-offset-2 underline text-yellow-400 hover:text-yellow-500 transition ease-in-out"
            >
              Skip
            </button>
            <button
              onClick={handlePrevious}
              className="font-semibold underline-offset-2 underline text-blue-600 hover:text-blue-400 transition ease-in-out"
            >
              Previous
            </button>
            <button
              className="font-semibold underline-offset-2 underline text-red-600 hover:text-red-500 transition ease-in-out"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
};

export default Quizzes;



