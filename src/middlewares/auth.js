function isLogin(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/auth');
}

module.exports = {
    isLogin
}