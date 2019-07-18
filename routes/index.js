const Router = require('koa-router')

const router = new Router()

router.prefix('/api')
router.get('/', async function (ctx, next) {
  ctx.body = {
    code: 0
  }
})
module.exports =  router
