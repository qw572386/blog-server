const { userDao } = require('../dao')
const result = require('../utils/result')
class User {
    static async createUser(ctx) {
        try {
            const {userName, email} = await userDao.createUser(ctx.request.body)
            ctx.body = result.success({userName, email})
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
}

module.exports = User
