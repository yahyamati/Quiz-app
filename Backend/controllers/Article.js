import Article from '../models/ArticleModel.js';
import CategoryArticle from '../models/CategoryArticleModel.js';

// Add a new article
export const addArticle = async (req, res) => {
    const { question, text1, text2, liText, text3, category1,category2 } = req.body;
    const image_filename = req.file ? req.file.filename : null;

    if (!category1 || !category2) {
        return res.status(400).json({ success: false, message: 'Both categories are required' });
    }

    try {
        const newArticle = new Article({
            Question: question, // Ensure field names match
            text1,
            image: image_filename,
            text2,
            liText: JSON.parse(liText),
            text3,
            category1,
            category2
        });

        const savedArticle = await newArticle.save();

        res.json({
            success: true,
            message: 'Article added',
            data: savedArticle
        });
    } catch (err) {
        res.json({
            success: false,
            message: 'Error adding article',
            error: err.message
        });
    }
};


// Get all articles
export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json({
            success: true,
            data: articles
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get a single article by ID
export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        res.status(200).json({
            success: true,
            data: article
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update an article
export const updateArticle = async (req, res) => {
    const { text1, image, text2, liText, text3 } = req.body;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            { text1, image, text2, liText, text3 },
            { new: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedArticle
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete an article
export const deleteArticle = async (req, res) => {
    const { id } = req.body;

    try {
        await Article.findByIdAndDelete(id);
        res.json({ success: true, message: 'Article removed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error removing article' });
    }
};

// Remove a CategoryArticle
export const removeCategoryArticle = async (req, res) => {
    const { id } = req.body;

    try {
        await CategoryArticle.findByIdAndDelete(id);
        res.json({ success: true, message: 'CategoryArticle removed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error removing CategoryArticle' });
    }
};

// Add a new CategoryArticle
export const addCategoryArticle = async (req, res) => {
    const { CategoryArticle: categoryArticleName, Description } = req.body;

    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    if (!categoryArticleName) {
        return res.status(400).json({ success: false, message: 'CategoryArticle is required' });
    }

    if (!Description) {
        return res.status(400).json({ success: false, message: 'Description is required' });
    }

    const image_filename = req.file.filename;

    const newCategoryArticle = new CategoryArticle({
        CategoryArticle: categoryArticleName,
        image: image_filename,
        Description: Description
    });

    try {
        await newCategoryArticle.save();
        res.json({ success: true, message: 'CategoryArticle added successfully' });
    } catch (error) {
        console.error('Error adding CategoryArticle:', error);
        res.status(500).json({ success: false, message: 'Error adding CategoryArticle' });
    }
};




// List all categories
export const listCategoriesArticle = async (req, res) => {
    try {
        const categories = await CategoryArticle.find({});
        res.json({ success: true, data: categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error retrieving categories' });
    }

};


  // List all articles by category
  export const listFiltredArticle = async (req, res) => {
    const category = req.query.category2; // Query parameter name
    let filter = {};

    // Apply filter if category is provided
    if (category) {
        filter = { category2: category };
    }

    try {
        // Fetch articles based on filter
        const articles = await Article.find(filter);

        // Return response
        res.json({
            success: true,
            data: articles
        });
    } catch (err) {
        // Handle errors
        res.status(500).json({ success: false, message: err.message });
    }
}
