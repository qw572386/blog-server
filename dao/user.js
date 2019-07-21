const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const userModel = require('../models/user')
class User {
    static async createUser(params) {
        const hasUser = await userModel.findOne({email: params.email})
        if (hasUser) {
            throw new Error('邮箱已被占用, 请更换')
        }
        const user = new userModel(params)
        user.password = await bcrypt.hash(params.password, 10)
        user.save()
        return user
    }
    static async login(params) {
        const user = await userModel.findOne({email: params.email})
        if (!user) {
            throw new Error('用户不存在')
        }
        const isMatch = await bcrypt.compare(params.password, user.password)
        if (!isMatch) {
            throw new Error('用户名或密码错误')
        }
        const {userName, email, avatar, _id} = user;
        const token = jwt.sign({userId: _id, userName, email, avatar}, config.secretKey, { expiresIn: config.expiresIn })
        return token
    }
}

module.exports = User