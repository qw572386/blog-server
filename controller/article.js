const { articleDao } = require('../dao')
const result = require('../utils/result')
class Article {
    static async getList(ctx) {
        try {
            const params = {
                pageSize: ctx.query.pageSize,
                pageNo: ctx.query.pageNo,
                canditions: ctx.request.body
            }
            const data = await articleDao.getList(params)
            ctx.body = result.success(data)
        } catch (error) {
            ctx.body = result.error(error.message)
        }
    }
}

module.exports = Article
