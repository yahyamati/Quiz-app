// Backend/models/quizModel.js

import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answer: answerSchema
});

const quizSchema = new mongoose.Schema({
  question: questionSchema,
  category: {type: String,required: true },
  example:{type: String},
  explainExample:{type: String},
});
  

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
