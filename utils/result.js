const success = (data, msg = '成功', code = 0) => {
    return {
        code,
        msg,
        data
    }
}
const error = (msg = '失败', code = 1) => {
    return {
        code,
        msg
    }
}
module.exports = {
    success,
    error
}