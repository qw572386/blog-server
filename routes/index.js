const Router = require('koa-router')
const userRouter = require('./user')
const articleRouter = require('./article')

const router = new Router()
router.prefix('/api')
router.use(userRouter.routes())
router.use(articleRouter.routes())
module.exports =  router
