const userModel = require('../models/user')
class User {
    static async createUser(params) {
        const hasUser = await userModel.findOne({email: params.email})
        if (hasUser) {
            throw new Error('邮箱已被占用, 请更换')
        }
        const user = new userModel(params)
        user.save()
        return user
    }
}

module.exports = User