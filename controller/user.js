const { userDao } = require('../dao')
const result = require('../utils/result')
class User {
    static async createUser(ctx) {
        try {
            const {userName, email, avatar} = await userDao.createUser(ctx.request.body)
            ctx.body = result.success({userName, email, avatar})
        } catch (error) {
            ctx.body = result.error(error.message)
        }
    }
    static async login(ctx) {
        try {
            const {email, password} = ctx.request.body
            const token = await userDao.login({email, password})
            ctx.body = result.success({token})
        } catch (error) {
            ctx.body = result.error(error.message)
        }
    }
    static async getUser(ctx) {
        if (!ctx.req.user) {
            ctx.body = result.error('验证登录信息失败')
            return
        }
        const user = {...ctx.req.user, password: null} // 用户密码不返回
        ctx.body = result.success(user)
    }
}

module.exports = User
