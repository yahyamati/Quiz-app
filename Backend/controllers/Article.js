import Article from '../models/ArticleModel.js';

// Add a new article
export const addArticle = async (req, res) => {
    const { text1, text2, liText, text3 , category } = req.body;
    const image_filename = req.file.filename;

    try {
        const newArticle = new Article({
            text1,
            image:image_filename,
            text2,
            liText: JSON.parse(liText),
            text3,
            category
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
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);

        if (!deletedArticle) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Article deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
