import { createNewsService, findAllNewsService } from '../services/news.service.js'


const createNews = async (req, res) => {
    try{
        const { title, text, banner } = req.body

        if (!title || !text || !banner) {
            res.status(400).send(
                {
                    message: "All fields are required to create a register"
                }
            )
        }

        await createNewsService({
            title,
            text,
            banner,
            user: { "_id": "668c4155d065c729ac3d6fd1" }
        })

        res.status(201).send({
            message: "User created successfully"
        })

    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const findAllNews = async (req, res) => {
    const news = await findAllNewsService();
    if(news.length === 0) {
        res.status(400).send({
            message: "There are no registered users"
        })
    }
    res.send(news)
}

export { createNews, findAllNews }