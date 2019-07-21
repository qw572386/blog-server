const Router = require('koa-router')
const userController = require('../controller/user')
const router = new Router()

router.prefix('/user')
router.post('/create', userController.createUser)
router.post('/login', userController.login)
module.exports =  router