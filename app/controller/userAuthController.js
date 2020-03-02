const service = require('../service/authService');

module.exports = function userAuthController(){
    this.signUp = (req,res)=>{
    service.signupUser(req.body).then(data =>{
        res.status(200).send(data)
    }).catch(err => res.status(500).send(err));
    }

    this.login = (req, res)=>{
        service.authenticate(req.body).then(data =>{
            res.status(200).send(data)
        }).catch(err => res.status(500).send(err));
    }
}