import { Router } from 'express'
import { createNews, findAllNews } from '../controllers/news.controller.js'

const route = Router();

route.post('/', createNews)
route.get('/', findAllNews)

export default route