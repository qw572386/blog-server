const { userDao } = require('../dao')
const result = require('../utils/result')
class User {
    static async createUser(ctx) {
        try {
            const user = await userDao.createUser(ctx.request.body)
            ctx.body = result.success(user)
        } catch (error) {
            ctx.body = result.error(error.message)
        }
    }
}

module.exports = User
