const passport = require('koa-passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const userModel = require('../models/user')
const config = require('../config')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secretKey
passport.use(new Strategy(opts, async (payload, done) => {
    try {
        const user = await userModel.findOne({ email: payload.email })
        if (!user) {
            return done(null, false, '用户不存在')
        }
        const isMatch = payload.password === user.password
        if (!isMatch) {
            return done(null, false, '用户名或密码错误')
        }
        return done(null, user)
    } catch (error) {
        return done(error, false)
    }
}));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    return done(null, user)
})
module.exports = passport
