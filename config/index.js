module.exports = {
  port: 3000, // 服务端运行端口
  dbUrl: 'mongodb://127.0.0.1:27017/blog', // mongodb地址
  secretKey: 'secretkey', // jwt私钥
  expiresIn: 3600 // token过期时间
}
