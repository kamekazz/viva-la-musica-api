const jwt =require('jsonwebtoken')
const confing =require('../conf/confing')

module.exports = function(req,res, next){
    let token = req.headers['authorization']

    if (token) {
        jwt.verify(token, confing.secret, function (err,decoded)  {
            if (err) {
                res.json({
                    success: false,
                    message:'failed to authorizationu'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status(403).json({
            success: false,
            message:'no token provided'
        })
    }

}