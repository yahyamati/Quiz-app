import Design from '../models/CssBattleModels.js';

// Create a new design
export const createDesign = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  const image_url = req.file.path;

  const newDesign = new Design({
    name: req.body.name, // Assuming 'name' is the field in the request body
    image: image_url,
  });

  try {
    await newDesign.save(); // Use 'newDesign' instead of 'category'
    res.status(201).json({ success: true, message: 'Design added successfully', design: newDesign });
  } catch (error) {
    console.error('Error adding design:', error);
    res.status(500).json({ success: false, message: 'Error adding design' });
  }
};

// Get all designs
export const getDesigns = async (req, res) => {
  try {
    const designs = await Design.find(); // Retrieves all designs
    res.status(200).json(designs);
  } catch (error) {
    console.error('Error fetching designs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a design by ID
export const getDesignById = async (req, res) => {
  const { id } = req.params;

  try {
    const design = await Design.findById(id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    res.status(200).json(design);
  } catch (error) {
    console.error('Error fetching design:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeCssImage = async (req, res) => {
  const { id } = req.body;

  try {
    await Design.findByIdAndDelete(id);
    res.json({ success: true, message: 'Image removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error removing Image' });
  }
};

