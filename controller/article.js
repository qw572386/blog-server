const { articleDao } = require('../dao')
const result = require('../utils/result')
class Article {
    /**
     * 分页获取文章列表
     * @param {Object} ctx 
     */
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
    /**
     * 新增文章
     * @param {Object} ctx 
     */
    static async add(ctx) {
        try {
            await articleDao.add(ctx.request.body)
            ctx.body = result.success(undefined, '新增文章成功')
        } catch (error) {
            ctx.body = result.error(error.message)
        }
    }
    /**
     * 删除文章
     * @param {Object} ctx 
     */
    static async delete(ctx) {
        try {
            await articleDao.delete(ctx.request.body)
            ctx.body = result.success(undefined, '删除文章成功')
        } catch (error) {
            ctx.body = result.error(error.message)
        }
    }
}

module.exports = Article
