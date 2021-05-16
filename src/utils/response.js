function response(status = 200, data = [], errMessage = '') {
    return { status, data, errMessage };
}

module.exports = {
    response,
}