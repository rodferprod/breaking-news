import { Router } from "express"

import userRouter from "../routes/user.route.js"
import authRouter from "../routes/auth.route.js"
import newsRouter from "../routes/news.route.js"
import swaggweRouter from "../routes/swagger.route.js"

const router = Router();

router.use("/user", userRouter)
router.use('/auth', authRouter);
router.use('/news', newsRouter);
router.use('/docs', swaggweRouter);

export default router;