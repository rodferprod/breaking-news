import {
    createNewsService,
    findAllNewsService,
    countNewsService,
    findTopNewsService,
    findNewsByIdService,
    findNewsByTitleService,
    findNewsByUserService,
    updateNewsService,
    deleteNewsService,
    likeNewsService,
    removelikeNewsService,
    commentNewsService,
    removeCommentNewsService
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

const updateNews = async (req, res) => {
    try{
        // Passed through authMiddleware
        const userId = req.id;
        const { id } = req.params;
        if(!id) {
            res.status(400).send({
                message: 'News id is missing'
            })
        }

        const { title, text, banner } = req.body;

        if(!title && !text && !banner) {
            res.status(400).send({
                message: 'Submit at least one field to update post'
            })
        }

        const news = await findNewsByIdService(id);

        if(!news) {
            res.status(400).send({
                message: 'News is missing'
            })
        }

        if(String(news.user._id) !== String(userId)) {
            res.status(400).send({
                message: "You can't update this post"
            })
        }

        await updateNewsService(id, title, text, banner);

        res.send({
            message: "News updated successfully"
        })

    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const deleteNews = async (req, res) => {
    try{
        const userId = req.id;
        const { id } = req.params;

        if(!id) {
            res.status(400).send({
                message: 'News id is missing'
            })
        }

        const news = await findNewsByIdService(id);

        if(!news) {
            res.status(400).send({
                message: 'News is missing'
            })
        }

        if(String(news.user._id) !== String(userId)) {
            res.status(400).send({
                message: "You can't delete this post"
            })
        }

        await deleteNewsService(id);

        res.send({
            message: "News deleted successfully"
        })

    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const likeNews = async (req, res) => {
    try{
        // Passed through authMiddleware
        const userId = req.id;
        const { id } = req.params;
        if(!id) {
            res.status(400).send({
                message: 'News id is missing'
            })
        }

        const news = await findNewsByIdService(id);

        if(!news) {
            res.status(400).send({
                message: 'News is missing'
            })
        }

        const likeResult = await likeNewsService(id, userId);

        if(likeResult?.likes.length > 0) {
            await removelikeNewsService(id, userId);
            return res.status(200).send({
                message: "Like removed"
            })
        }

        res.send({
            message: "News liked"
        })

    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const commentNews = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.id;
        const { id } = req.params;

        if(!text) {
            return res.status(400).send({
                message: "Write a message to comment"
            })
        }

        await commentNewsService(userId, id, text);

        res.send({
            message: "News commented"
        })

    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const removeCommentNews = async (req, res) => {
    try {
        const userId = req.id;
        const { idNews, idComment } = req.params;

        const news = await removeCommentNewsService(userId, idNews, idComment);
        
        const commentNews = news.comments.find(
            comment => comment.commentId === idComment
        )

        if(!commentNews) {
            return res.status(404).send({
                message: "Comment not found"
            })
        }

        if(String(commentNews?.userId) !== String(userId)) {
            return res.status(400).send({
                message: "You can't remove this comment"
            })
        }
        
        res.send({
            message: "Comment removed"
        })

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
    findNewsByUser,
    updateNews,
    deleteNews,
    likeNews,
    commentNews,
    removeCommentNews
}