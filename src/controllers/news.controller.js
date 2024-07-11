import {
    createNewsService,
    findAllNewsService,
    countNewsService,
    findTopNewsService
} from '../services/news.service.js'

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
        let { limit, offset } = req.query;
        
        if(!limit) {
            limit = 5;
        } else {
            limit = Number(limit);
        }

        if(!offset) {
            offset = 0;
        } else {
            offset = Number(offset);
        }

        const news = await findAllNewsService(limit, offset);

        if(news.length === 0) {
            res.status(400).send({
                message: "There are no registered news"
            })
        }

        const total = await countNewsService();
        
        const currentURL = req.baseUrl;
        
        const next = offset + limit;
        const previous = offset - limit < 0
            ? null
            : offset - limit

        const nextUrl = next < total
            ? `${currentURL}?limit=${limit}&offset=${next}`
            : null;

        const previousUrl = previous != null
            ? `${currentURL}?limit=${limit}&offset=${previous}`
            : null;

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                userId: item.user._id,
                name: item.user.name,
                username: item.user.username,
                avatar: item.user.avatar
            }))
        });

    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const findTopNews = async (req, res) => {
    
    const topNews = await findTopNewsService();

    if(!topNews) {
        return res.status(400).send({
            message: "There are no posts"
        })
    }

    res.send({
        results: {
            id: topNews._id,
            title: topNews.title,
            text: topNews.text,
            banner: topNews.banner,
            likes: topNews.likes,
            comments: topNews.comments,
            userId: topNews.user._id,
            name: topNews.user.name,
            username: topNews.user.username,
            avatar: topNews.user.avatar
        }
    });
}

export { createNews, findAllNews, findTopNews }