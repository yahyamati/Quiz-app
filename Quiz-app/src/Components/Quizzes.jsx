import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import QuizOver from "./QuizzOver";
import ProgressBar from "./ProgressBar";
import CodeSnippet from "./CodeSnippet";
import Loading from "../Loading";

const Quizzes = ({url}) => {
    const { category } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(() => {
        const savedIndex = localStorage.getItem(`${category}_currentIndex`);
        return savedIndex !== null ? JSON.parse(savedIndex) : 0;
    });
    const [revealed, setRevealed] = useState(false);
    const [skippedCount, setSkippedCount] = useState(() => {
        const savedSkippedCount = localStorage.getItem(`${category}_skippedCount`);
        return savedSkippedCount !== null ? JSON.parse(savedSkippedCount) : 0;
    });
    const [passedCount, setPassedCount] = useState(() => {
        const savedPassedCount = localStorage.getItem(`${category}_passedCount`);
        return savedPassedCount !== null ? JSON.parse(savedPassedCount) : 0;
    });
    const [slide, setSlide] = useState('right');
    const [actions, setActions] = useState(() => {
        const savedActions = localStorage.getItem(`${category}_actions`);
        return savedActions !== null ? JSON.parse(savedActions) : [];
    });
    const [loading, setLoading] = useState(true);

   

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`${url}/api/quiz/listFil?category=${category}`);
                setQuizzes(response.data.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('There was an error fetching the quizzes!', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchQuizzes();
    }, [category]);

    useEffect(() => {
        localStorage.setItem(`${category}_currentIndex`, JSON.stringify(currentIndex));
    }, [currentIndex, category]);

    useEffect(() => {
        localStorage.setItem(`${category}_skippedCount`, JSON.stringify(skippedCount));
    }, [skippedCount, category]);

    useEffect(() => {
        localStorage.setItem(`${category}_passedCount`, JSON.stringify(passedCount));
    }, [passedCount, category]);

    useEffect(() => {
        localStorage.setItem(`${category}_actions`, JSON.stringify(actions));
    }, [actions, category]);

    const handleNext = () => {
        setSkippedCount(skippedCount + 1);
        setActions([...actions, 'skipped']);
        setCurrentIndex(currentIndex + 1);
        setRevealed(false);
        setSlide('left');
    };

    const handlePass = () => {
        setPassedCount(passedCount + 1);
        setActions([...actions, 'passed']);
        setCurrentIndex(currentIndex + 1);
        setRevealed(false);
        setSlide('left');
    };

    const handleReveal = () => {
        setRevealed(true);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const lastAction = actions[currentIndex - 1];
            if (lastAction === 'skipped') {
                setSkippedCount(skippedCount - 1);
            } else if (lastAction === 'passed') {
                setPassedCount(passedCount - 1);
            }

            setActions(actions.slice(0, -1));
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
        setActions([]);
        localStorage.removeItem(`${category}_currentIndex`);
        localStorage.removeItem(`${category}_skippedCount`);
        localStorage.removeItem(`${category}_passedCount`);
        localStorage.removeItem(`${category}_actions`);
    };
    
    const totalQuestions = quizzes.length;
    const progressPercentage = ((currentIndex) / totalQuestions) * 100;

    const frameworkToLanguageMap = {
        flask: 'python',
        django: 'python',
        laravel: 'php',
        angular: 'typescript',
        spring: 'java',
        flutter: 'dart',
        'react.js': 'jsx',
        rails: 'ruby',
        'C#': 'csharp',
        'asp.net': 'csharp',
        'vue.js': 'javascript',
        'express.js': 'javascript',
        'node.js': 'javascript',
        'next js': 'jsx',
        mysql: 'sql',
        postgresql: 'sql',
        nodejs: 'javascript',

        // Add more frameworks and their languages as needed
    };
    const language = frameworkToLanguageMap[category.toString().toLowerCase()] || category.toString().toLowerCase();

    if (loading) {
      return <Loading/>;
  }

    return (
        <div>
            {currentIndex >= totalQuestions ? (
                <QuizOver
                    totalQuestions={totalQuestions}
                    skippedCount={skippedCount}
                    passedCount={passedCount}
                    category={category}
                />
            ) : (
                <>
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
                    <div className="border p-4 my-4 rounded-xl shadow-lg mx-auto table md:w-7/12 w-11/12 mb-20">
                        <ProgressBar progressPercentage={progressPercentage} skippedCount={skippedCount} passedCount={passedCount} totalQuestions={totalQuestions} currentIndex={currentIndex} home={false} />
                        <h2
                            className={`text-xl font-semibold mx-auto table ${
                                revealed ? "my-6 slide-up" : "my-28 slide-down"
                            } text-center ${!revealed && slide === "left" ? "slide-left" : "slide-right"}`}
                        >
                            {quizzes[currentIndex].question.text}
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
                                <div className="bg-slate-100 p-3 xs:p-4 rounded-xl mb-6">
                                    <p className="text-gray-700">
                                        {quizzes[currentIndex].question.answer.text}
                                    </p>
                                </div>
                                {quizzes[currentIndex].example && (
                                    <>
                                        <CodeSnippet
                                            language={language}
                                            codeString={quizzes[currentIndex].example}
                                        />
                                        {quizzes[currentIndex].explainExample && (
                                            <div className="bg-slate-100 p-3 xs:p-4 rounded-xl mt-6">
                                                <p className="text-gray-700">{quizzes[currentIndex].explainExample}</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        <div className="flex justify-center xs:justify-between mt-10 flex-wrap gap-4 sm:gap-0 text-sm xs:text-lg">
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
                </>
            )}
        </div>
    );
};

export default Quizzes;
