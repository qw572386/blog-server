const Router = require('koa-router')
const userController = require('../controller/user')
const passport = require('koa-passport')

const router = new Router()

router.prefix('/user')
router.post('/create', userController.createUser)
router.post('/login', userController.login)
router.get('/getUser', passport.authenticate('jwt', { session: false }), userController.getUser)
module.exports =  router