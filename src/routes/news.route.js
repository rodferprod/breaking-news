import { Router } from 'express'
import { createNews, findAllNews, findTopNews, findNewsById } from '../controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const route = Router();

route.post('/', authMiddleware, createNews)
route.get('/', findAllNews)
route.get('/top', findTopNews)
route.get('/:id', findNewsById)

export default route