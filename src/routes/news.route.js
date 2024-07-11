import { Router } from 'express'
import { createNews, findAllNews, findTopNews } from '../controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const route = Router();

route.post('/', authMiddleware, createNews)
route.get('/', findAllNews)
route.get('/top', findTopNews)

export default route