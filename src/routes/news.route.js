import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { validId } from '../middlewares/global.middleware.js';

import {
    createNews,
    findAllNews,
    findTopNews,
    findNewsById,
    findNewsByTitle,
    findNewsByUser,
    updateNews,
    deleteNews,
    likeNews,
    commentNews,
    removeCommentNews
} from '../controllers/news.controller.js'

const newsRouter = Router();

newsRouter.get('/', findAllNews)
newsRouter.get('/top', findTopNews)
newsRouter.get('/search', findNewsByTitle)

newsRouter.use(authMiddleware);

newsRouter.get('/byuser', findNewsByUser)
newsRouter.post('/', createNews)

newsRouter.use(validId)

newsRouter.get('/:id', findNewsById)
newsRouter.patch('/:id', updateNews)
newsRouter.delete('/:id', deleteNews)
newsRouter.patch('/like/:id', likeNews)
newsRouter.patch('/comment/:id', commentNews)
newsRouter.patch('/comment/:idNews/:idComment', removeCommentNews)

export default newsRouter