import { Router } from 'express'
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
import { authMiddleware } from '../middlewares/auth.middleware.js'

const route = Router();

route.post('/', authMiddleware, createNews)
route.get('/', findAllNews)
route.get('/top', findTopNews)
route.get('/search', findNewsByTitle)
route.get('/byuser', authMiddleware, findNewsByUser)

route.get('/:id', authMiddleware, findNewsById)
route.patch('/:id', authMiddleware, updateNews)
route.delete('/:id', authMiddleware, deleteNews)
route.patch('/like/:id', authMiddleware, likeNews)
route.patch('/comment/:id', authMiddleware, commentNews)
route.patch('/comment/:idNews/:idComment', authMiddleware, removeCommentNews)

export default route