import Article from '../models/Article.js';
import User from '../models/User.js';
import { summarizeWithLLM } from '../services/llmService.js';

export const createArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const article = await Article.create({
      title,
      content,
      tags, // optional, will be undefined if not sent — which is fine
      createdBy: req.user.id,
    });

    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username');

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles.' });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('createdBy', 'username');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    res.status(500).json({ message: 'Failed to fetch article' });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    // Only creator can edit
    if (article.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this article' });
    }

    // Only update allowed fields
    const { title, content, tags } = req.body;
    if (title !== undefined) article.title = title;
    if (content !== undefined) article.content = content;
    if (tags !== undefined) article.tags = tags;

    await article.save();
    res.json(article);

  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Failed to update article' });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Fetch current user for role
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Only creator or admin can delete
    if (article.createdBy.toString() !== req.user.id && currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this article' });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Failed to delete article' });
  }
};

export const summarizeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    const summary = await summarizeWithLLM(article.content, process.env.LLM_PROVIDER);

    res.json({ summary });

  } catch (error) {
    console.error("Summarize Error:", error);
    res.status(500).json({ message: 'Failed to summarize article' });
  }
};