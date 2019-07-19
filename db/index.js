const mongoose = require('mongoose')
const config = require('../config')

module.exports = () => {
    const options = {
        useNewUrlParser: true,
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0
    }
    mongoose.set('debug', (coll, method, query, doc, options) => {
        console.log({ coll, method, query, doc, options })
    })

    mongoose.connect(config.dbUrl, options);
    const connectTimes = 0;
    mongoose.connection.on('disconnected', () => {
        if (connectTimes < 3) {
            mongoose.connect(config.dbUrl, options);
            connectTimes++;
        } else {
            console.log('数据库连接已断开, 请联系系统管理员')
        }
    })
    mongoose.connection.on('error', (error) => {
        console.log(error);
    })
    mongoose.connection.once('open', () => {
        console.log('数据库连接成功')
    })

}