const Router = require('koa-router')
const { articleController } = require('../controller')

const router = new Router()

router.prefix('/article')
router.post('/list', articleController.getList)
module.exports =  router