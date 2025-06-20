import express from 'express';
import {
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  summarizeArticle,
  createArticle
} from '../controllers/articleController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const articleRouter = express.Router();

// All routes require authentication
articleRouter.use(authenticateJWT);

// Article routes
articleRouter.post('/', createArticle);
articleRouter.get('/', getArticles);
articleRouter.get('/:id', getArticleById);
articleRouter.put('/:id', updateArticle);
articleRouter.delete('/:id', deleteArticle);
articleRouter.post('/:id/summarize', summarizeArticle);

export default articleRouter;
