const Router = require('koa-router')
const { articleController } = require('../controller')

const router = new Router()

router.prefix('/article')
router.post('/list', articleController.getList)
router.post('/add', articleController.add)
router.post('/delete', articleController.delete)
module.exports =  router