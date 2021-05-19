function isLogin(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/auth');
}

function isAdmin(request, response, next) {
    if(request.isAuthenticated()) {
        if(request.user.role != "0"){
            next();
        }
    }
    response.redirect('back');
}

module.exports = {
    isLogin,
    isAdmin,
}