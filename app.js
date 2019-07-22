const Koa = require('koa')
const app = new Koa()

const cors = require('koa-cors')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const passport = require('./utils/passport')
const session = require('koa-session')

const config = require('./config')
const routes = require('./routes')
const dbInit = require('./db')

const port = process.env.PORT || config.port

app.keys = ['secret']
app.use(session({}, app))

// error handler
onerror(app)

// middlewares
app.use(bodyparser({ enableTypes:['json', 'form', 'text']}))
  .use(session({}, app))
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(cors())

// init database
dbInit()

// 初始化passport
app.use(passport.initialize())
app.use(passport.session())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(routes.routes(), routes.allowedMethods())
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
