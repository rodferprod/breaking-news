import {
    createNewsService,
    findAllNewsService,
    countNewsService,
    findTopNewsService,
    findNewsByIdService,
    findNewsByTitleService,
    findNewsByUserService
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
    try {
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
    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const findNewsById = async (req, res) => {
    try {
        const { id } = req.params;
    
        if(!id) {
            return res.status(400).send({
                message: "Id param is expected"
            })
        }
    
        const news = await findNewsByIdService(id);
    
        if (!news) {
            return res.status(400).send({
                message: "News not found"
            })
        }
    
        res.send({
            results: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                userId: news.user._id,
                name: news.user.name,
                username: news.user.username,
                avatar: news.user.avatar
            }
        });

    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const findNewsByTitle = async (req, res) => {
    try {

        const { title } = req.query;

        if(!title) {
            return res.status(400).send({
                message: "A description is expected"
            })
        }
        
        const news = await findNewsByTitleService(title);

        if(news.length === 0) {
            res.status(400).send(
                {
                    message: 'There are no news with this title'
                }
            )
        }

        res.send({
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

const findNewsByUser = async (req, res) => {
    try{
        // Receiving id from authMiddleware
        const id = req.id;

        const news = await findNewsByUserService(id);

        if(news.length === 0) {
            return res.status(400).send({
                message: "There are no news from informed user"
            })
        }

        res.send({
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

export {
    createNews,
    findAllNews,
    findTopNews,
    findNewsById,
    findNewsByTitle,
    findNewsByUser
}