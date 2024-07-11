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

export {
    createNewsService,
    findAllNewsService,
    countNewsService,
    findTopNewsService,
    findNewsByIdService,
    findNewsByTitleService,
    findNewsByUserService
}