import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from 'react-icons/fa';

const Quizzes = () => {
    const { category } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [skippedCount, setSkippedCount] = useState(0);
    const [passedCount, setPassedCount] = useState(0);

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
    };

    const handlePass = () => {
        setPassedCount(passedCount + 1);
        setCurrentIndex(currentIndex + 1);
        setRevealed(false);
    };

    const handleReveal = () => {
        setRevealed(true);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setRevealed(false);
        }
    };
    const handleReset = () => {
        setCurrentIndex(0);
        setRevealed(false);
        setSkippedCount(0);
        setPassedCount(0);
    };

    const totalQuestions = quizzes.length;
    const progressPercentage = ((currentIndex ) / totalQuestions) * 100;

    if (currentIndex >= totalQuestions) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">You've completed all the quizzes!</h1>
                <p>Skipped: {skippedCount}</p>
                <p>Passed: {passedCount}</p>
            </div>
        );
    }

    const currentQuiz = quizzes[currentIndex];

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl mx-auto table mt-10">
                Quizzes for {category}
            </h1>
            <p className="mx-auto font-semibold table p-6 md:text-xl text-gray-500 text-center">
                Test, rate and improve your {category} knowledge with these questions.
            </p>
            <div className="border p-4 my-4 rounded-xl shadow-lg mx-auto table md:w-2/5 w-11/12">
            <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                Progress
                            </span>
                        </div>
                        
                
                <p className="text-blue-600 bg-blue-20 sm:text-sm text-xs">Skipped: {skippedCount}</p>
                <p className="text-blue-600 bg-blue-20 sm:text-sm text-xs">Passed: {passedCount}</p>
           
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-blue-600 bg-blue-200 rounded-3xl px-2 p-1">
                                {currentIndex}/{totalQuestions}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div style={{ width: `${progressPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold mx-auto table my-20 text-center">{currentQuiz.question.text}</h2>
                <div className=" flex justify-center">
                   {
                     !revealed && 
                     <button 
                        onClick={handleReveal} 
                        className="font-semibold underline-offset-2  underline text-gray-600 hover:text-black transition ease-in-out">
                        Reveal Answer
                    </button>
                   }
                    {
                        revealed && <button
                            onClick={() => setRevealed(false)}
                            className="font-semibold underline-offset-2  underline text-gray-600 hover:text-black transition ease-in-out"
                        >
                            Hide Answer
                        </button>
                    }
                    
                </div>
                {revealed && (
                    <div className="mt-4 ">
                        <p className="text-gray-700">{currentQuiz.question.answer.text}</p>
                        {currentQuiz.example && (
                             <CodeSnippet language={category.toString().toLowerCase()} codeString={currentQuiz.example}/>
                        )}
                    </div>
                )}
                <div className="flex justify-between mt-10">
                    
                    <button 
                        onClick={handlePass} 
                        className="font-semibold underline-offset-2  underline text-green-500 hover:text-green-600 transition ease-in-out">
                        Know the Answer
                    </button>
                    <button 
                        onClick={handleNext} 
                        className="font-semibold underline-offset-2  underline text-yellow-400 hover:text-yellow-500 transition ease-in-out">
                        Skip
                    </button>
                    <button 
                        onClick={handlePrevious} 
                        className="font-semibold underline-offset-2  underline text-blue-600 hover:text-blue-400 transition ease-in-out">
                        Previous
                    </button>
                    <button className="font-semibold underline-offset-2  underline text-red-600 hover:text-red-500 transition ease-in-out"
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


const CodeSnippet = ({ codeString,language }) => {
    return (
      <div className=" rounded-lg shadow-xl p-2">
        <div className="flex justify-between items-center text-black rounded-t-lg ">
        <span className=" underline font-bold">Code Example : </span>
        <button
          className="mx-2"
          onClick={() => {navigator.clipboard.writeText(codeString)
            toast.success('Code copied to clipboard!');
          }

          }
        >
          <FaCopy className="size-6"/>
        </button>
      </div>
        <SyntaxHighlighter language={language} style={atomDark} className="rounded-b-lg bg-slate-900 overflow-scroll text-xs md:text-lg overflow-x-auto w-64 2xs:w-80 xs:w-full" >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  };