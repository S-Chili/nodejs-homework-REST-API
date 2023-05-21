const jwt = require('jsonwebtoken')

const {User} = require('../models/user')

const {RequestError} = require('../helpers')

const {SECRET_KEY} = process.env

const authenticate = async(req, res, next) => {
    try {
       const {authorization = ""} = req.headers;
       const {bearer, token} = authorization.split(" "); 

       if(bearer !== "Bearer") {
        throw RequestError(401, "Not authorized");
       }

       const {id} = jwt.verify(token, SECRET_KEY);
       const user = await User.findById(id);

       if (!user || !user.token || user.token !== token) {
        throw RequestError(401, "Not authorized");
       }

       req.user = user;
    } catch (err) {
        if (!err.status) {
          err.status = 401;
          err.message = "Not authorized"
        }

        next(err);
    }
}

module.exports = authenticate