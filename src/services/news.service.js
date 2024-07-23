import News from '../models/News.js'

const createNewsService = (body) => News.create(body);

const findAllNewsService = (limit, offset) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNewsService = () => News.countDocuments();

const findTopNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const findNewsByIdService = (id) => News.findById(id).populate("user");

const findNewsByTitleService = (title) => News.find({
    title: {
        $regex: `${title || ""}`,
        $options: "i"
    }
}).sort({ _id: -1 }).populate("user");

const findNewsByUserService = (id) => News.find({
    user: id
}).sort({ _id: -1 }).populate("user");

const updateNewsService = (id, title, text, banner) => News.findOneAndUpdate(
    { _id: id },
    { 
        title: title,
        text: text,
        banner: banner
    },
    {
        rawResult: true
    }
)

const deleteNewsService = (id) =>  News.findOneAndDelete(
    { _id: id }
)

const likeNewsService = (id, userId) => News.findByIdAndUpdate(
    {
        _id: id,
        "likes.userId": {
            $nin: [userId]
        }
    },
    {
        $push: {
            likes: {
                userId,
                createdAt: new Date()
            }
        }
    }
)

const removelikeNewsService = (id, userId) => News.findOneAndUpdate(
    { _id: id },
    {
        $pull: {
            likes: {
                userId
            }
        }
    }
)

const commentNewsService = (userId, id, comment) => {
    const commentId = Math.floor(
        new Date() * Math.random()
    ).toString(36);

    return News.findOneAndUpdate(
        { _id: id },
        {
            $push: {
                comments: {
                    commentId,
                    userId,
                    comment,
                    createdAt: new Date()
                }
            }
        }
    )
}

const removeCommentNewsService = (idUser, idNews, idComment) => News.findOneAndUpdate(
    { _id: idNews },
    {
        $pull: {
            comments: {
                userId: idUser,
                commentId: idComment
            }
        }
    }
)

export {
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
}