const model = require('../model/user')
const authService = require('../service/authService')
exports.authenticate = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        authService.verifyToken(token).then(decoded => {
            model.findOne({ publicId: decoded._doc.publicId }, '').then(data => {

                if (data == null) {
                    res.status(401).send({ success: false, message: "User does not exist" });
                } else {
                    req.auth = {
                        publicId: data._doc.publicId,
                        contact: decoded._doc.contact,
                        Id: data._doc._id
                    }
                    res.locals.response = { data: decoded, message: "", success: true };
                    next();
                }
            })
        }).catch(err => {
            res.status(401).send({ success: false, message: "Invalid token", data: err });
        })
    } else {
        res.status(401).send({ success: false, message: "No token provided" });
    }
}
