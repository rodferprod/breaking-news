import { Router } from 'express'
import {
    createNews,
    findAllNews,
    findTopNews,
    findNewsById,
    findNewsByTitle,
    findNewsByUser
} from '../controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const route = Router();

route.post('/', authMiddleware, createNews)
route.get('/', findAllNews)
route.get('/top', findTopNews)
route.get('/search', findNewsByTitle)
route.get('/byuser', authMiddleware, findNewsByUser)

route.get('/:id', authMiddleware, findNewsById)

export default route