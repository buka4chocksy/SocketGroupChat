const userAuthController = require('../controller/userAuthController')
var router = require('express').Router();
module.exports = function(){
    const userCntrl = new userAuthController();
    router.post('/register', userCntrl.signUp );
    router.post('/authenticate', userCntrl.login);
    return router;
}