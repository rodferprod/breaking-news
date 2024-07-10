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
            user: { _id: req.id }
        })

        res.status(201).send({
            message: "News created successfully"
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
    try{
        const news = await findAllNewsService();
        if(news.length === 0) {
            res.status(400).send({
                message: "There are no registered users"
            })
        }
        res.send(news)
    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

export { createNews, findAllNews }