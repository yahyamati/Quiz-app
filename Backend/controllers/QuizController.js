
import Quiz from '../models/QuizModel.js';
import Category from '../models/categoryModel.js';

// Add a quiz
const addQuiz = async (req, res) => {
  const { questionText, answerText, category , example,explainExample } = req.body;

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
      category,
      example,
      explainExample
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
//List all quizzes by category
export const listFiltredQuizzes = async (req, res) => {
  const category = req.query.category;
  let filter = {};
  if (category) {
      filter = { category: category };
  }
  try {
      const quizzes = await Quiz.find(filter);
      res.json({
          success: true,
          data: quizzes
      });
  } catch (err) {
      res.status(500).json({ success: false, message: err.message });
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


const removeCategory = async (req, res) => {
  const { id } = req.body;

  try {
    await Category.findByIdAndDelete(id);
    res.json({ success: true, message: 'Category removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error removing category' });
  }
};


const addCategory = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  const image_filename = req.file.filename;

  const category = new Category({
    category: req.body.category,
    image: image_filename
  });

  try {
    await category.save();
    res.json({ success: true, message: 'Category added successfully' });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ success: false, message: 'Error adding category' });
  }
};


const listCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error retrieving categories' });
  }
};




export { addQuiz, listQuizzes, removeQuiz, addCategory ,listCategories , removeCategory};
