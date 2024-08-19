

import mongoose from 'mongoose';


const DesignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or base64 image data
    required: true,
  },
});

// Create a model from the schema
const Design = mongoose.model('Design', DesignSchema);

export default Design;
