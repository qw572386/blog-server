const Router = require('koa-router')
const userRouter = require('./user')

const router = new Router()
router.prefix('/api')
router.use(userRouter.routes())
module.exports =  router
