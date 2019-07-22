const articleModel = require('../models/article')
class Article {
    /**
     * 分页获取文章列表
     * @param {Object} params 参数对象
     */
    static async getList({pageSize = 10, pageNo = 1, canditions = {}}) {
        const total = await articleModel.find(canditions).count()
        const articles = await articleModel.find(canditions).limit(pageSize).skip(pageSize * (pageNo - 1))
        return { total, articles }
    }
}

module.exports = Article