const articleModel = require('../models/article')
class Article {
    /**
     * 分页获取文章列表
     * @param {Object} params 参数对象
     *   @param {Number} pageSize 每页数量
     *   @param {Number} pageNo 页码
     *   @param {Object} canditions canditions 条件
     */
    static async getList({pageSize = 10, pageNo = 1, canditions = {}}) {
        pageSize = Number(pageSize)
        pageNo = Number(pageNo)
        if (isNaN(pageSize)) {
            throw new Error('pageSize参数格式错误')
        }
        if (isNaN(pageNo)) {
            throw new Error('pageNo参数格式错误')
        }
        const total = await articleModel.find(canditions).countDocuments()
        const articles = await articleModel.find(canditions).limit(pageSize).skip(pageSize * (pageNo - 1))
        return { total, articles }
    }
    /**
     * 新增文章
     * @param {Object} params 参数对象
     */
    static async add(params = {}) {
        if (!params.title) {
            throw new Error('文章标题不能空')
        }
        const article = new articleModel(params)
        article.save()
        return article
    }
    /**
     * 删除文章
     * @param {Array} articleIds 文章ID集合
     */
    static async delete(articleIds) {
        if (!Array.isArray(articleIds)) {
            throw new Error('删除文章失败文章参数格式错误不能空')
        }
        if (!articleIds.length) {
            throw new Error('删除文章失败文章ID不能空')
        }
        const result = await articleModel.deleteMany({ _id: { $in: articleIds } })
        if (!result.deletedCount) {
            throw new Error('删除文章失败，文章不存在')
        }
        return result
    }
}

module.exports = Article