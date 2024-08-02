// Backend/controllers/QuizController.js

import Quiz from '../models/quizModel.js';

// Add a quiz
const addQuiz = async (req, res) => {
  const { questionText, answerText, category } = req.body;

  if (!category) {
    return res.json({ success: false, message: 'Category is required' });
  }

  try {
    const quiz = new Quiz({
      question: {
        text: questionText,
        answer: {
          text: answerText
        }
      },
      category
    });

    await quiz.save();
    res.json({ success: true, message: 'Quiz added', data: quiz });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error adding quiz' });
  }
};

// List all quizzes
const listQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json({ success: true, data: quizzes });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error retrieving quizzes' });
  }
};

// Remove a quiz
const removeQuiz = async (req, res) => {
  const { id } = req.body;

  try {
    await Quiz.findByIdAndDelete(id);
    res.json({ success: true, message: 'Quiz removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error removing quiz' });
  }
};

export { addQuiz, listQuizzes, removeQuiz };
